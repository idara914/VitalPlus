import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Ensure URL is properly formatted
const redisUrl = process.env.REDIS_URL;
if (!redisUrl || !redisUrl.startsWith("redis://")) {
  throw new Error("Invalid REDIS_URL: Must start with redis://");
}

const redisClient = createClient({
  url: redisUrl,
  legacyMode: true, // Ensures compatibility with older Redis methods
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

// Function to connect Redis before exporting
async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

connectRedis();

export default redisClient;


