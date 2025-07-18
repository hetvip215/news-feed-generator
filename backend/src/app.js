import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import newsRoutes from './routes/news.routes.js';
import userActivity from './routes/userActivity.routes.js'
import dotenv from "dotenv";
dotenv.config();
const app=express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser()) 

// ... other routes
app.use("/api/v1/users", userRoutes)

app.use('/api/v1/news', newsRoutes);

app.use('/api/v1/activity', userActivity);

app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/test", (req, res) => {
    res.json({ message: "CORS is working!" });
});
  


export {app}