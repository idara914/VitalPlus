"use server";

import { removeSession, setSession } from './../sessions';

export const signIn = async (token, user) => {
  await setSession(token, user);

  // Commented out browser-side cookie + localStorage logic to isolate the issue
  /*
  if (typeof window !== "undefined" && token) {
    try {
      // Set cookie securely
      document.cookie = `token=${token}; path=/; max-age=3600; Secure; SameSite=Strict;`; // ✅ secure flags

      // Optional: cache user locally
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("userId", payload.id);
      localStorage.setItem("email", payload.email);
    }

