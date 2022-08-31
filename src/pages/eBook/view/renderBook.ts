import { getWords } from '../../../API/wordsAPI';
import renderWord from './renderWord';
import './renderWord.scss';
import renderPagination from './pagination';
import createElement, { removeAllChildNodes, userPosition } from '../../../helpers';
import playSound from '../controller/musicController';
import wordOptions from '../controller/wordOptionsController';
import { UserLevel, Word } from '../../../Interfaces';
import strings, { filterAggregate } from '../../../constants';
import { getAggregatedWords } from '../../../API/aggregatedWordsAPI';

export const renderEBookHeader = () => {
  const eBook = createElement('div', 'e-book-container');
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
  removeAllChildNodes(mainWrapper);
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
  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
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
  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
  removeAllChildNodes(wordsContainer);

  const userId = String(localStorage.getItem('user_id'));
  const token = String(localStorage.getItem('token'));
  let filter = filterAggregate.hard;
  const isHardWord = getAggregatedWords({ userId, token, filter });

  filter = filterAggregate.isLearned;
  const isLearnedWord = getAggregatedWords({ userId, token, filter });

  const wordsList = getWords(userLevel.page - 1, userLevel.group - 1);

  if (localStorage.getItem('user_id')) {
    isHardWord.then((res1) => {
      const hardWordArray = res1;
      isLearnedWord.then((res2) => {
        const learnedWordArray = res2;
        wordsList.then((res3) => {
          res3.map((word: Word) => {
            const wordItem = createElement('div', 'word-item');
            addLevelStyle(userLevel);
            wordsContainer.appendChild(wordItem);
            wordItem.append(renderWord(word));

            hardWordArray[0].paginatedResults.forEach((elem: Word) => {
              if (word.id === elem._id) {
                const hardWord = <HTMLElement>document.querySelector(`[data-hard="${word.id}"]`);
                hardWord.textContent = String(strings.complicated);
                const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${word.id}"]`);
                complicatedBtn.textContent = strings.easy;
                complicatedBtn.classList.add('easy-word');
              }
            });

            learnedWordArray[0].paginatedResults.forEach((elem: Word) => {
              if (word.id === elem._id) {
                const learnedBtn = <HTMLElement>document.querySelector(`[data-id2="${word.id}"]`);
                learnedBtn.style.backgroundColor = 'grey';
                learnedBtn.textContent = strings.learnedWords;
                const hardWord = <HTMLElement>document.querySelector(`[data-hard="${word.id}"]`);
                hardWord.textContent = strings.learned;
                const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${word.id}"]`);
                complicatedBtn.textContent = strings.complicated;
                complicatedBtn.classList.remove('easy-word');
              }
            });
            return wordItem;
          });
          playSound();
          wordOptions();
        });
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
