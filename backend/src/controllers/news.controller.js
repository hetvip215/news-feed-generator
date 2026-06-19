import axios from 'axios';
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'; // Adjust path based on your structure
import redisClient from "../db/redis.js";

const NEWS_API_URL = 'https://newsapi.org/v2/everything'; // or top-headlines
//const API_KEY = process.env.NEWS_API_KEY;
//console.log("api key",API_KEY);
//"8a4290dbbe4b4eada47acca4b66dd41d"
const CACHE_TTL = 60 * 5;
export const getNews = async (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    //console.log("api key",API_KEY);
  const { q } = req.query;

  const searchQuery = q || "technology";
  const cacheKey = `news:${searchQuery.toLowerCase()}`;

  try {
    
    try {

      const cachedNews = await redisClient.get(cacheKey);
  
      if (cachedNews) {
          console.log(` CACHE HIT: ${searchQuery}`);
  
          return res.status(200).json(
              new ApiResponse(
                  200,
                  JSON.parse(cachedNews),
                  "News fetched successfully (Redis Cache)"
              )
          );
      }
  
      console.log(` CACHE MISS: ${searchQuery}`);
  
    } catch (err) {
    
        console.warn("⚠️ Redis unavailable, fetching from NewsAPI...");
    
    }

    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: q || 'technology', // default keyword
        apiKey: API_KEY,
        language: 'en',
        pageSize: 20
      }
    });
    
    try {

      await redisClient.setEx(
          cacheKey,
          CACHE_TTL,
          JSON.stringify(response.data.articles)
      );
  
    } catch (err) {
    
        console.warn(" Failed to cache data in Redis");
    
    }

    return res.status(200).json(
      new ApiResponse(200, response.data.articles, "News fetched successfully")
    );

  } catch (error) {
    console.error("Error fetching news:", error.message);
    return res.status(500).json(
      new ApiError(500, null, "Failed to fetch news")
    );
  }
};
