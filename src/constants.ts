import asset1 from './assets/7741846_3711949.jpg';
import asset2 from './assets/7140765_3556940.jpg';
import asset3 from './assets/22378293_6566143.jpg';
import irynaAvatar from './assets/Iryna.png';
import olgaAvatar from './assets/Olga.png';
import alexeiAvatar from './assets/Alexei.png';

const strings = {
  registration: 'Начать обучение',
  creatorsTitle: 'Наша команда',
};

interface MainDescription {
  img: string,
  message: string,
}

export const mainDescriptions: MainDescription[] = [
  {
    img: asset1,
    message: 'Пробуй разные уровни сложности в упражнениях и ставь новые цели',
  },
  {
    img: asset2,
    message: 'Следи за своим прогрессом в реальном времени на странице статистики',
  },
  {
    img: asset3,
    message: 'Тренируй чтение, аудирование, лексику в увлекательных играх',
  },
];

interface CreatorDescription {
  img: string,
  name: string,
  role: string,
  githubLink: string,
  description: string,
}

export const creatorsDescriptions: CreatorDescription[] = [
  {
    img: irynaAvatar,
    name: 'Ирина',
    role: 'Frontend Developer',
    githubLink: 'https://github.com/irynakolh',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
  {
    img: olgaAvatar,
    name: 'Ольга',
    role: 'Frontend Developer',
    githubLink: 'https://github.com/olgad21',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
  {
    img: alexeiAvatar,
    name: 'Алексей',
    role: 'Frontend Developer',
    githubLink: 'https://github.com/marusovalexei',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
];

export default strings;
