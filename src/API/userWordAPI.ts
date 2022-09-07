/* eslint-disable no-console */
import { host, path } from '../constants';
import { ExtendUserWord, UserWord } from '../Interfaces';

export const createUserWord = async ({
  userId,
  wordId,
  token,
  wordBase,
}: UserWord) => {
  const response = await fetch(
    `${host}${path.users}/${userId}${path.words}/${wordId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBase),
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      return 'Bad request';
    }
    if (response.status === 401) {
      return 'Access token is missing or invalid';
    }
  }
  const content = await response.json();
  return content;
};

export const getAllUserWords = async ({
  userId,
  token,
}: UserWord): Promise<ExtendUserWord[]> => {
  const response = await fetch(`${host}${path.users}/${userId}${path.words}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Access token is missing or invalid');
  }
  const content = await response.json();
  return content;
};

export const getUserWord = async ({ userId, wordId, token }: UserWord) => {
  const response = await fetch(
    `${host}${path.users}/${userId}${path.words}/${wordId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  return response;
};

export const updateUserWord = async ({
  userId,
  wordId,
  token,
  wordBase,
}: UserWord) => {
  const response = await fetch(
    `${host}${path.users}/${userId}${path.words}/${wordId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBase),
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      return 'Bad request';
    }
    if (response.status === 401) {
      return 'Access token is missing or invalid';
    }
  }
  const content = await response.json();
  return content;
};

export const deleteUserWord = async ({ userId, wordId, token }: UserWord) => {
  const response = await fetch(
    `${host}${path.users}/${userId}${path.words}/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, wordId, token }),
    },
  );

  if (!response.ok) {
    return 'Access token is missing or invalid';
  }
  return 'The user word has been deleted';
};
/*
export const createUserStatistic = async ({ userId, token, item }: UserStatistic) => {
  const response = await fetch(
    `${host}${path.users}/${userId}${path.settings}/${item}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBase),
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      return 'Bad request';
    }
    if (response.status === 401) {
      return 'Access token is missing or invalid';
    }
  }
  const content = await response.json();
  return content;
};
 */
