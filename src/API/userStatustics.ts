import { host, path } from '../constants';
import { UserStatistic } from '../Interfaces';

export const getUserStatistics = async ({ userId, token }: UserStatistic) => {
  const response = await fetch(
    `${host}${path.users}/${userId}/${path.statistics}}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Access token is missing or invalid');
  }

  const content = await response.json();
  return content;
};

export const updateUserStatistics = async ({
  userId,
  token,
  statistics,
}: UserStatistic) => {
  const response = await fetch(
    `${host}${path.users}/${userId}/${path.statistics}}}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
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
