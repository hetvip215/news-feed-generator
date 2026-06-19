import dotenv from "dotenv"
import connectDB from "./db/index.js";
import redisClient from "./db/redis.js";
import {app} from './app.js'

dotenv.config({
    path:'./.env'
})

connectDB()
.then(async () => {

    await redisClient.connect();
    console.log("Redis Connected");

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });

})
.catch((err) => {
    console.log("Connection failed", err);
});