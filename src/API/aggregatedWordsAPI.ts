/* eslint-disable @typescript-eslint/no-unused-vars */
import { filterAggregate, host, path } from '../constants';
import { Aggregation } from '../Interfaces';

export const getAggregatedWords = async ({
  userId, token, filter,
} : Aggregation) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.aggregatedWords}?filter=${encodeURI(String(filter))}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return response.json();
};

export const getAggregatedWord = async ({
  userId, wordId, token, group, page, wordsPerPage, filter,
} : Aggregation) => {
  const response = await fetch(`${host}${path.users}/${userId}${path.aggregatedWords}/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    // params: {
    //   filter,
    //   wordsPerPage: '20',
    // },
  });
  return response.json();
};
