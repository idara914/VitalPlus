"use server";

import { removeSession, setSession } from './../sessions';

export const signIn = async (token, user) => {
  await setSession(token, user);

  if (typeof window !== "undefined" && token) {
    try {
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
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  }
};
