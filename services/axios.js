import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://www.vital-plus.xyz",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,             // ✅ Ensures cookie is sent with request
  responseType: "json",              // ✅ Forces axios to parse JSON
  timeout: 10000,                    // (optional) fails fast if no response
});

export default instance;
