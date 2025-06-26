import axios from 'axios';
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'; // Adjust path based on your structure

const NEWS_API_URL = 'https://newsapi.org/v2/everything'; // or top-headlines
//const API_KEY = process.env.NEWS_API_KEY;
//console.log("api key",API_KEY);
//"8a4290dbbe4b4eada47acca4b66dd41d"

export const getNews = async (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    //console.log("api key",API_KEY);
  const { q } = req.query;

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: q || 'technology', // default keyword
        apiKey: API_KEY,
        language: 'en',
        pageSize: 20
      }
    });
    

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
