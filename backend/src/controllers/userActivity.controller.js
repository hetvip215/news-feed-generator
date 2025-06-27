import { User } from "../models/user.model.js";
import axios from "axios";
import { extractKeywords } from "../utils/keywordExtractor.js"; // optional utility

export const getUserActivity = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("keywords clickedArticles");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        keywords: user.keywords || [],
        clickedArticles: user.clickedArticles || [],
      });
    } catch (error) {
      console.error("Error fetching user activity:", error);
      res.status(500).json({ message: "Failed to fetch activity", error: error.message });
    }
  };
  
// 1️⃣ Track search keyword
export const trackSearch = async (req, res) => {
  const { keyword } = req.body;
  const userId = req.user._id;

  if (!keyword) return res.status(400).json({ message: "Keyword required" });

  try {
    const user = await User.findById(userId);

    const existing = user.keywords.find(k => k.word === keyword);
    if (existing) {
      existing.count += 1;
    } else {
      user.keywords.push({ word: keyword });
    }

    await user.save();

    res.status(200).json({ message: "Keyword tracked" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2️⃣ Track clicked article
export const trackArticleClick = async (req, res) => {
    const { url, title, content } = req.body;
    const userId = req.user._id;
  
    if (!url || !title || !content) {
      return res.status(400).json({ message: "Missing article data" });
    }
  
    try {
      
      const keywords = extractKeywords(content);
      
  
      const user = await User.findById(userId);
  
      for (const word of keywords) {
        const existing = user.keywords.find(k => k.word === word);
        if (existing) {
          existing.count += 1;
        } else {
          user.keywords.push({ word });
        }
      }
  
      user.clickedArticles.push({ url, title });
  
      await user.save();
  
      res.status(200).json({ message: "Click tracked and keywords updated" });
    } catch (err) {
      //console.error("Error tracking click:", err); // <- log the full error
      res.status(500).json({
        message: "Error tracking click",
        error: err.message,
      });
    }
  };
  

// 3️⃣ Recommend articles based on top keywords
export const getRecommendedArticles = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    const topKeywords = user.keywords
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(k => k.word)
      .join(" OR ");

    if (!topKeywords) {
      return res.status(200).json({ articles: [], message: "No interests yet" });
    }

    const newsApiKey = process.env.NEWS_API_KEY;
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: topKeywords,
        sortBy: "publishedAt",
        language: "en",
        apiKey: newsApiKey,
      },
    });

    res.status(200).json({ articles: response.data.articles });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recommendations", error: err.message });
  }
};
