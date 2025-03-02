import axios from "axios";

const instance = axios.create({
  baseURL: "https://vital-plus.xyz:3000", // ✅ Removed extra `/api`
});

export default instance;
