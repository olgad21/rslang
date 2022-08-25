import { getWords } from '../controller/wordsController';
import strings, { Word } from '../../constants';
import renderWord from './renderWord';
import './renderWord.scss';
import renderPagination from './pagination';
import {
  createElement,
  removeAllChildNodes,
  userPosition,
} from '../../helpers';
import playSound from '../controller/musicController';

export const renderEBookPage = () => {
  const eBook = createElement('div', 'e-book-container');
  const mainWrapper = document.querySelector(
    '.main__wrapper',
  ) as HTMLDivElement;
  mainWrapper.innerHTML = '';
  mainWrapper.appendChild(eBook);

  const title = createElement('h2', 'title');
  title.textContent = strings.chapterEBook;
  const savana = createElement('h3', ['game', 'savana']);
  savana.textContent = strings.savana;
  const audioCall = createElement('h3', ['game', 'audio-call']);
  audioCall.textContent = strings.audioCall;

  const gameBox = createElement('div', 'game-box');
  gameBox.append(savana, audioCall);

  const titleContainer = createElement('div', 'title-container');
  titleContainer.append(title, gameBox);
  eBook.appendChild(titleContainer);

  const chapters = createElement('div', 'chapter-container');
  const levels = [1, 2, 3, 4, 5, 6];
  let count = 0;
  levels.map((level) => {
    const levelBtn = createElement('button', 'level-btn');
    const userLevel = userPosition();
    const currentLevel = userLevel.group;
    if (level === currentLevel) {
      levelBtn.classList.add('active-element');
    }
    levelBtn.setAttribute('data-id', `${count}`);
    levelBtn.classList.add(`level-${level}`);
    levelBtn.innerText = `${level}`;
    count += 1;
    return chapters.appendChild(levelBtn);
  });
  eBook.appendChild(chapters);

  const paginationElem = renderPagination();
  const pagination = createElement('div', 'pagination');
  pagination.appendChild(paginationElem);
  eBook.appendChild(pagination);

  const wordsContainer = createElement('div', 'words-container');
  mainWrapper.appendChild(wordsContainer);
};

export const renderEBook = () => {
  const userLevel = userPosition();
  const wordsContainer = document.querySelector(
    '.words-container',
  ) as HTMLDivElement;
  removeAllChildNodes(wordsContainer);
  getWords(userLevel.page - 1, userLevel.group - 1).then((response) => {
    response.map((word: Word) => {
      const wordItem = createElement('div', 'word-item');
      if (userLevel.group === 1) {
        wordsContainer.style.backgroundColor = 'green';
      } else if (userLevel.group === 2) {
        wordsContainer.style.backgroundColor = 'lawngreen';
      } else if (userLevel.group === 3) {
        wordsContainer.style.backgroundColor = 'yellow';
      } else if (userLevel.group === 4) {
        wordsContainer.style.backgroundColor = 'orange';
      } else if (userLevel.group === 5) {
        wordsContainer.style.backgroundColor = 'orangered';
      } else if (userLevel.group === 6) {
        wordsContainer.style.backgroundColor = 'red';
      }
      wordsContainer.appendChild(wordItem);
      wordItem.append(renderWord(word));
      return wordItem;
    });
    playSound();
  });
};
