import { getWords } from '../controller/wordsController';
import { Word } from '../../constants';
import renderWord from './renderWord';
import './renderWord.scss';
import renderPagination from './pagination';
// eslint-disable-next-line import/no-cycle
import { chooseLevel, choosePage } from '../controller/listenController';
import { userPosition } from '../../helpers';

export const renderEBookPage = () => {
  const eBook = document.createElement('div');
  eBook.classList.add('e-book-container');

  const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
  mainWrapper.innerHTML = '';
  mainWrapper.appendChild(eBook);

  const title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = 'Электронный учебник';
  const savana = document.createElement('h3');
  savana.classList.add('game', 'savana');
  savana.textContent = 'Саванна';
  const audioCall = document.createElement('h3');
  audioCall.classList.add('game', 'audio-call');
  audioCall.textContent = 'Аудио вызов';

  const gameBox = document.createElement('div');
  gameBox.classList.add('game-box');
  gameBox.append(savana, audioCall);

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  titleContainer.append(title, gameBox);
  eBook.appendChild(titleContainer);

  const chapters = document.createElement('div');
  chapters.classList.add('chapter-container');
  const levels = [1, 2, 3, 4, 5, 6];
  let count = 0;
  levels.map((level) => {
    const levelBtn = document.createElement('button');
    levelBtn.classList.add('level-btn');

    const userLevel = userPosition();
    const currentLevel = +userLevel.group;
    if (level === currentLevel) {
      levelBtn.classList.add('active-element');
    }

    levelBtn.setAttribute('data-id', `${count}`);
    levelBtn.innerText = `${level}`;
    count += 1;
    return chapters.appendChild(levelBtn);
  });
  eBook.appendChild(chapters);
  chooseLevel();

  const paginationElem = renderPagination();
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.appendChild(paginationElem);
  eBook.appendChild(pagination);

  const wordsContainer = document.createElement('div');
  wordsContainer.classList.add('words-container');
  mainWrapper.appendChild(wordsContainer);
  choosePage();
};

export const renderEBook = () => {
  const userLevel = userPosition();
  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
  wordsContainer.innerHTML = '';
  getWords(userLevel.page - 1, userLevel.group - 1).then((response) => {
    response.map((word: Word) => {
      const wordItem = document.createElement('div');
      wordItem.classList.add('word-item');
      wordsContainer?.appendChild(wordItem);
      wordItem.append(renderWord(word));
      return wordItem;
    });
  });
};
