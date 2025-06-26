import express from 'express';
import { getNews } from '../controllers/news.controller.js';

const router = express.Router();

router.get('/', getNews); // GET /api/v1/news?q=bitcoin

export default router;
