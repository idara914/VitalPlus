import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://default:8e1WgS4NWNub6g2PfDecXTWFCBG4ihjk@redis-15632.c89.us-east-1-3.ec2.redns.redis-cloud.com:15632";

const redisClient = createClient({
  url: redisUrl,
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

