interface UserAuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
}

interface UserData {
  id: string;
  email: string;
}

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
  items: Word[];
}

export interface UserWordOptions {
  difficulty: string;
  optional: {
    attemp: number;
    isNewWord: boolean;
    sprintNew: boolean;
    audioNew: boolean;
    guesses: number;
    error: number;
    isLearned: boolean;
    sprintLearned: boolean;
    audioLearned: boolean;
    date: string;
    dateSprintLearned: string;
    dateAudioLearned: string;
    dateSprintNew: string;
    dateAudioNew: string;
    dateLearned: string;
  };
}

export interface ExtendWord extends Word {
  _id: string;
  userWord: UserWordOptions;
}

export interface UserWord {
  userId: string;
  wordId?: string;
  token: string;
  wordBase?: UserWordOptions;
  wordResult?: UserWordOptions;
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

export interface ExtendUserWord extends UserWordOptions {
  id: string;
  wordId: string;
}

interface UserStatistic {
  userId: string;
  token?: string;
  statistics?: BaseStatistics;
}

export interface BaseStatistics {
  learnedWords: number;
  optional: {
    sprintBestScore: number;
    audioBestScore: number;
  };
}

export {
  UserData, UserCredentials, UserAuthData, UserStatistic,
};
