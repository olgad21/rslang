import { host, path, Word } from '../../constants';

interface UserWordOptions {
  difficulty: string;
  optional: {
    attemp: number;
    isNewWord: boolean;
    guesses: number;
    error: number;
    isLearned: boolean;
  }
}

interface ExtendWord extends Word {
  _id: string;
  userWord: UserWord;
}

interface UserWord {
  userId: string;
  wordId?: string;
  token: string;
  word?: UserWordOptions;
}

const startWordInfo: UserWordOptions = {
  difficulty: 'weak',
  optional: {
    attemp: 0,
    isNewWord: false,
    guesses: 0,
    error: 0,
    isLearned: false,
  },
};

export const createUserWord = async ({
  userId, wordId, token, word,
}: UserWord) => {
  const response = await fetch(`${host}/${path.users}/${userId}/${path.words}/${wordId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
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
  const response = await fetch(`${host}/${path.users}/${userId}/${path.words}`, {
    method: 'GET',
    credentials: 'include',
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
  const response = await fetch(`${host}/${path.users}/${userId}/${path.words}/${wordId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      return 'Access token is missing or invalid';
    } if (response.status === 404) {
      return 'User\'s word not found';
    }
  }
  const content = await response.json();
  return content;
};

export const updateUserWord = async ({
  userId, wordId, token, word,
}: UserWord) => {
  const response = await fetch(`${host}/${path.users}/${userId}/${path.words}/${wordId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
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
  const response = await fetch(`${host}/${path.users}/${userId}/${path.words}/${wordId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordId),
  });

  if (!response.ok) {
    return 'Access token is missing or invalid';
  }
  return 'The user word has been deleted';
};
