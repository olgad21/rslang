import { host, path, Word } from '../../../constants';

export const getWords = async (page: number, group: number) : Promise<Word[]> => {
  const res = await fetch(`${host}${path.words}?page=${page}&group=${group}`);
  const data = await res.json();
  return data;
};

export const getWord = async (id: number): Promise<Word> => (await fetch(`${host}${path.words}/${id}`)).json();
