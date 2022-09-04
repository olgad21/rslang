import { getWords } from '../../../API/wordsAPI';
import renderWord from './renderWord';
import './renderWord.scss';
import renderPagination from './pagination';
import {
  createElement,
  removeAllChildNodes,
  userPosition,
} from '../../../helpers';
import playSound from '../controller/musicController';
import wordOptions from '../controller/wordOptionsController';
import { ExtendUserWord, UserLevel, Word } from '../../../Interfaces';
import strings from '../../../constants';
import { getAllUserWords } from '../../../API/userWordAPI';

export const renderEBookHeader = () => {
  const eBook = createElement('div', 'e-book-container');
  const mainWrapper = document.querySelector(
    '.main__wrapper'
  ) as HTMLDivElement;
  removeAllChildNodes(mainWrapper);
  mainWrapper.appendChild(eBook);

  const title = createElement('h2', 'title');
  title.textContent = strings.chapterEBook;
  const savana = createElement('h3', ['game', 'savana']);
  savana.textContent = strings.spint;
  const audioCall = createElement('h3', ['game', 'audio-call']);
  audioCall.textContent = strings.audioCall;

  const gameBox = createElement('div', 'game-box');
  gameBox.append(savana, audioCall);

  const titleContainer = createElement('div', 'title-container');
  titleContainer.append(title, gameBox);
  eBook.appendChild(titleContainer);

  const chapters = createElement('div', 'chapter-container');
  const levels = [1, 2, 3, 4, 5, 6, 7];
  let count = 1;
  levels.map((level) => {
    const levelBtn = createElement('button', 'level-btn');
    levelBtn.setAttribute('data-id', `${count}`);
    levelBtn.classList.add(`level-${level}`);
    levelBtn.innerText = `${level}`;
    const userLevel = userPosition();
    const currentLevel = userLevel.group;
    if (Number(levelBtn.getAttribute('data-id')) === currentLevel) {
      levelBtn.classList.add('active-element');
    }
    if (level === 7) {
      levelBtn.textContent = strings.complicatedWords;
      levelBtn.classList.add('hard-level');
    }
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

const addLevelStyle = (userLevel: UserLevel) => {
  const wordsContainer = document.querySelector(
    '.words-container'
  ) as HTMLDivElement;
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
};

export const renderEBook = () => {
  const userLevel = userPosition();

  const wordsContainer = document.querySelector(
    '.words-container'
  ) as HTMLDivElement;
  wordsContainer.classList.remove('center');
  removeAllChildNodes(wordsContainer);

  const userId = String(localStorage.getItem('user_id'));
  const token = String(localStorage.getItem('token'));

  const userWordList = getAllUserWords({ userId, token });

  const wordsList = getWords(userLevel.page - 1, userLevel.group - 1);

  if (localStorage.getItem('user_id')) {
    userWordList.then((res1) => {
      const userWordArray = res1;
      wordsList.then((res2) => {
        res2.map((word: Word) => {
          const wordItem = createElement('div', 'word-item');
          addLevelStyle(userLevel);
          wordsContainer.appendChild(wordItem);
          wordItem.append(renderWord(word));

          userWordArray.forEach((elem: ExtendUserWord) => {
            if (word.id === elem.wordId) {
              const hardWord = <HTMLElement>(
                document.querySelector(`[data-hard="${word.id}"]`)
              );
              const complicatedBtn = <HTMLButtonElement>(
                document.querySelector(`[data-id1="${word.id}"]`)
              );
              const learnedBtn = <HTMLElement>(
                document.querySelector(`[data-id2="${word.id}"]`)
              );

              if (elem.difficulty === 'hard') {
                hardWord.textContent = String(strings.complicated);
                complicatedBtn.textContent = strings.easy;
                complicatedBtn.classList.add('easy-word');
              }

              if (elem.optional.isLearned === true) {
                learnedBtn.textContent = strings.learnedWords;
                hardWord.textContent = strings.learned;
                learnedBtn.style.backgroundColor = 'grey';
              }

              const countGuesses = <HTMLElement>(
                document.querySelector(`[data-guess="${word.id}"]`)
              );
              if (elem.optional.guesses) {
                countGuesses.textContent = String(elem.optional.guesses);
              } else {
                countGuesses.textContent = '0';
              }
              const countError = <HTMLElement>(
                document.querySelector(`[data-error="${word.id}"]`)
              );
              if (elem.optional.error) {
                countError.textContent = String(elem.optional.error);
              } else {
                countGuesses.textContent = '0';
              }
            }
          });

          return wordItem;
        });
        playSound();
        wordOptions();
      });
    });
  } else {
    wordsList.then((response) => {
      response.map((word: Word) => {
        const wordItem = createElement('div', 'word-item');
        addLevelStyle(userLevel);
        wordsContainer.appendChild(wordItem);
        wordItem.append(renderWord(word));
        return wordItem;
      });
      playSound();
      wordOptions();
    });
  }
};
