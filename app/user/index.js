"use server";

import { removeSession, setSession } from './../sessions';

export const signIn = async (token, user) => {
  await setSession(token, user);

  if (typeof window !== "undefined" && token) {
    try {
      // Store the JWT in a cookie for client access (used in provider form submission)
      document.cookie = `token=${token}; path=/; max-age=3600; Secure; SameSite=Strict`;

      // Optionally store user info in localStorage or context if needed
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
    // Remove the token from cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Clear localStorage if used
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  }
};
