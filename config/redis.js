import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis-15632.c89.us-east-1-3.ec2.redns.redis-cloud.com:15632",
  legacyMode: true, // Ensures compatibility with older Redis methods
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

// Function to connect Redis before exporting
async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

connectRedis();

export default redisClient;
