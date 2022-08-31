import { getAggregatedWords } from '../../../API/aggregatedWordsAPI';
import strings, { filterAggregate } from '../../../constants';
import createElement, { removeAllChildNodes } from '../../../helpers';
import { Word } from '../../../Interfaces';
import renderWord from './renderWord';
import playSound from '../controller/musicController';
// eslint-disable-next-line import/no-cycle
import removeFromHard from '../controller/removeWordsController';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const renderHardLevel = () => {
  const filter = filterAggregate.hard;
  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
  removeAllChildNodes(wordsContainer);

  const hardWordsList = getAggregatedWords({ userId, token, filter });
  hardWordsList.then((response) => {
    response[0].paginatedResults.map((word: Word) => {
      const wordItem = createElement('div', 'word-item');
      wordsContainer.appendChild(wordItem);
      wordItem.append(renderWord(word));

      const hardWord = <HTMLElement>document.querySelector(`[data-hard="${word._id}"]`);
      hardWord.textContent = String(strings.complicated);
      const learnedBtn = <HTMLButtonElement>document.querySelector(`[data-id2="${word._id}"]`);
      learnedBtn.style.display = 'none';
      const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${word._id}"]`);
      complicatedBtn.textContent = strings.easy;
      complicatedBtn.classList.add('easy-word');
      return wordItem;
    });
    playSound();
    removeFromHard();
  });
};

export default renderHardLevel;
