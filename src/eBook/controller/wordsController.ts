import { WORDS_URL, Word } from '../../constants';

export const getWords = async (page = 0, group = 0): Promise<Word[]> => {
  const res = await fetch(`${WORDS_URL}?page=${page}&group${group}`);
  const data = await res.json();
  return data;
};

export const getWord = async (id: number): Promise<Word> => (await fetch(`${WORDS_URL}/${id}`)).json();
