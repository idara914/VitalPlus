'use server';

import { setSession, removeSession } from './../sessions';
import jwt_decode from 'jwt-decode';

export const signIn = async (token) => {
  const user = jwt_decode(token); // Extracts user { id, email, ... }
  await setSession(token, user);  // Save user and token in session
};

export const signOut = async () => {
  await removeSession();
};
