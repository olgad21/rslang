import asset1 from './assets/7741846_3711949.jpg';
import asset2 from './assets/7140765_3556940.jpg';
import asset3 from './assets/22378293_6566143.jpg';
import irynaAvatar from './assets/Iryna.png';
import olgaAvatar from './assets/Olga.png';
import alexeiAvatar from './assets/Alexei.png';
import { BaseStatistics, UserWordOptions } from './Interfaces';

const host = 'https://olgad21-learnwords-api.herokuapp.com';

const path = {
  users: '/users',
  tokens: '/tokens',
  words: '/words',
  aggregatedWords: '/aggregatedWords',
  statistics: '/statistics',
  settings: '/settings',
  signin: '/signin',
};

export const filterAggregate = {
  isLearned:
    '{"$and":[{"userWord.difficulty":"easy", "userWord.optional.isLearned":true}]}',
  hard: '{"$and":[{"userWord.difficulty":"hard"}]}',
  isNewWord: '{"$and":[{"userWord.optional.isNewWord":true}]}',
  attemp: '{"$and":[{"userWord.optional.attemp"}]}',
  guesses: '{"$and":[{"userWord.optional.guesses"}]}',
  error: '{"$and":[{"userWord.optional.error"}]}',
};

const WORDS_OF_PAGE = 20;
const PAGES_NUMBER = 30;

export enum Hard {
  easy = 'easy',
  hard = 'hard',
}

export const wordBase: UserWordOptions = {
  difficulty: Hard.easy,
  optional: {
    attemp: 0,
    isNewWord: false,
    sprintNew: false,
    audioNew: false,
    guesses: 0,
    error: 0,
    isLearned: false,
    sprintLearned: false,
    audioLearned: false,
    date: String(Date.now()),
    dateSprintLearned: String(Date.now()),
    dateAudioLearned: String(Date.now()),
    dateSprintNew: String(Date.now()),
    dateAudioNew: String(Date.now()),
    dateLearned: String(Date.now()),
  },
};

const strings = {
  registration: 'Начать обучение',
  creatorsTitle: 'Наша команда',
  chapterEBook: 'Электронный учебник',
  spint: 'Спринт',
  audioCall: 'Аудиовызов',
  complicated: 'Сложное',
  deleted: 'Удалить',
  regForm: 'Регистрация',
  loginForm: 'Войти в аккаунт',
  regSubmit: 'Зарегистрироватьcя',
  loginSubmit: 'Войти',
  loginQuestion: 'Нет аккаунта?',
  regQuestion: 'Уже есть аккаунт?',
  learned: 'Изученное',
  learnedWords: 'Изученные слова',
  complicatedWords: 'Cложные',
  deletedWords: 'Удаленные слова',
  easy: 'Простое',
  width: '33.3%',
  needLogin: 'Доступно только зарегистрированным пользователям.',
  guesses: 'Правильных ответов:',
  error: 'Не правильных ответов:',
  wordList: 'Список пуст',
};

export default strings;

const statsStrings = {
  numberLearnedWords: 'Количество изученных слов',
  percentageRightWords: '% правильных ответов',
  numberNewWords: 'Количество новых слов',
  seriesRightWords: 'Количество правильных ответов подряд',
  dayStats: 'Статистика за последние сутки',
  allStats: 'Статистика за всё время',
  new: 'Новые слова',
  learned: 'Изученные слова',
};

const gameIndicators = [
  {
    iconStyle: 'bi-patch-check',
    description: statsStrings.numberNewWords,
    id: 'new-words',
  },
  {
    iconStyle: 'bi-check2',
    description: statsStrings.numberLearnedWords,
    id: 'learned-words',
  },
  {
    iconStyle: 'bi-check2-all',
    description: statsStrings.seriesRightWords,
    id: 'right-words',
  },
];

const dailyIndicators = [
  {
    description: statsStrings.numberNewWords,
    id: 'daily-new-words',
  },
  {
    description: statsStrings.numberLearnedWords,
    id: 'daily-learned-words',
  },
  {
    description: statsStrings.percentageRightWords,
    id: 'daily-right-words',
  },
];

interface MainDescription {
  img: string;
  message: string;
}

const mainDescriptions: MainDescription[] = [
  {
    img: asset1,
    message: 'Пробуй разные уровни сложности в упражнениях и ставь новые цели',
  },
  {
    img: asset2,
    message:
      'Следи за своим прогрессом в реальном времени на странице статистики',
  },
  {
    img: asset3,
    message: 'Тренируй чтение, аудирование, лексику в увлекательных играх',
  },
];

interface CreatorDescription {
  img: string;
  name: string;
  role: string;
  githubLink: string;
  description: string;
}

const creatorsDescriptions: CreatorDescription[] = [
  {
    img: irynaAvatar,
    name: 'Ирина',
    role: 'Frontend Developer',
    githubLink: 'https://github.com/irynakolh',
    description:
      'Тимлид, занималась разработкой дизайна карточек слов и словаря, логикой их отображения. Настроила БД, организовала логику работы со сложными словами и фильтрами',
  },
  {
    img: olgaAvatar,
    name: 'Ольга',
    role: 'Frontend Developer',
    githubLink: 'https://github.com/olgad21',
    description:
      'Настроила аутентификацию, сделала структуру приложения, главную страницу, роутинг, дизайн и логику отображения кратко- и долгосрочной статистики по учебнику и играм',
  },
  {
    img: alexeiAvatar,
    name: 'Алексей',
    role: 'Frontend Developer',
    githubLink: 'https://github.com/marusovalexei',
    description:
      'Разработал меню игр, сделал дизайн и взаимодействие игры «Спринт» с БД, данными из учебника и статистикой',
  },
];

export const statisticsBase: BaseStatistics = {
  learnedWords: 0,
  optional: {
    sprintBestScore: 0,
    audioBestScore: 0,
  },
};

export {
  CreatorDescription,
  MainDescription,
  PAGES_NUMBER,
  WORDS_OF_PAGE,
  creatorsDescriptions,
  mainDescriptions,
  dailyIndicators,
  gameIndicators,
  statsStrings,
  path,
  host,
};
