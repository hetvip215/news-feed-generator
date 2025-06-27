import express from "express";
import {
  trackSearch,
  trackArticleClick,
  getRecommendedArticles,
  getUserActivity,
} from "../controllers/userActivity.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/track-search", verifyJWT, trackSearch);
router.post("/track-click", verifyJWT, trackArticleClick);
router.get("/recommendations", verifyJWT, getRecommendedArticles);
router.get("/my-activity", verifyJWT, getUserActivity); 

export default router;
