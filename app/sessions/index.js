'use server';

import { cookies } from 'next/headers';

export const getSession = async () => {
    const cookieStore = cookies();
    const session = { token: cookieStore.get('token')?.value, user: JSON.parse(cookieStore.get('user')?.value) };
    return session;
};

export const setSession = async (token, user) => {
    const cookieStore = cookies();
    cookieStore.set('token', token);
    cookieStore.set('user', JSON.stringify(user));
};

export const removeSession = async () => {
    const cookieStore = cookies();
    cookieStore.delete('token');
    cookieStore.delete('user');

    return true;
};