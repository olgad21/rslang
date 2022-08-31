export interface UserAuthData {
  'message': string,
  'token': string,
  'refreshToken': string,
  'userId': string,
  'name': string
}

export interface UserCredentials {
  name?: string,
  email: string,
  password: string,
}

interface UserData {
  'id': string,
  'email': string,
}

export default UserData;

export interface Word {
  id?: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface Words {
  items: Word[]
}

export interface UserWordOptions {
  difficulty: string;
  optional: {
    attemp: number;
    isNewWord: boolean;
    guesses: number;
    error: number;
    isLearned: boolean;
  }
}

export interface ExtendWord extends Word {
  _id: string;
  userWord: UserWord;
}

export interface UserWord {
  userId: string;
  wordId?: string;
  token: string;
  wordBase?: UserWordOptions;
}

export interface Aggregation {
  userId: string;
  wordId?: string;
  token?: string;
  group?: number;
  page?: number;
  wordsPerPage?: number;
  filter?: string;
}

export type UserLevel = {
  group: number;
  page: number;
};
