'use server';

import { removeSession, setSession } from './../sessions';

export const signIn = async (token, user) => {
    await setSession(token, user);
};

export const signOut = async () => {
    await removeSession();
};
