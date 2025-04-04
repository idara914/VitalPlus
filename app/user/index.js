"use server";

import { removeSession, setSession } from './../sessions';

export const signIn = async (token, user) => {
  await setSession(token, user);

  if (typeof window !== "undefined" && token) {
    try {
      // Set cookie securely
      document.cookie = `token=${token}; path=/; max-age=3600; Secure; SameSite=Strict;`; // ✅ secure flags

      // Optional: cache user locally
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("userId", payload.id);
      localStorage.setItem("email", payload.email);
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }
};

export const signOut = async () => {
  await removeSession();

  if (typeof window !== "undefined") {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  }
};

