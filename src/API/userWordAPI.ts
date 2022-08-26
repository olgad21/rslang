import { host, path } from '../constants';
import { UserWord } from '../Interfaces';

export const createUserWord = async ({
  userId, wordId, token, word,
}: UserWord) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.words}/${wordId}`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ difficulty: `${word}` }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      return 'Bad request';
    } if (response.status === 401) {
      return 'Access token is missing or invalid';
    }
  }
  const content = await response.json();
  return content;
};

export const getAllUserWords = async ({ userId, token }: UserWord) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.words}`, {
    method: 'GET',
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    return 'Access token is missing or invalid';
  }
  const content = await response.json();
  return content;
};

export const getUserWord = async ({ userId, wordId, token }: UserWord) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.words}/${wordId}`, {
    method: 'GET',
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  // if (!response.ok) {
  //   if (response.status === 401) {
  //     return 'Access token is missing or invalid';
  //   } if (response.status === 404) {
  //     return 'User\'s word not found';
  //   }
  // }
  return response;
};

export const updateUserWord = async ({
  userId, wordId, token, word,
}: UserWord) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.words}/${wordId}`, {
    method: 'PUT',
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId, wordId, token, word,
    }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      return 'Bad request';
    } if (response.status === 401) {
      return 'Access token is missing or invalid';
    }
  }
  const content = await response.json();
  return content;
};

export const deleteUserWord = async ({ userId, wordId, token }: UserWord) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.words}/${wordId}`, {
    method: 'DELETE',
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, wordId, token }),
  });

  if (!response.ok) {
    return 'Access token is missing or invalid';
  }
  return 'The user word has been deleted';
};
