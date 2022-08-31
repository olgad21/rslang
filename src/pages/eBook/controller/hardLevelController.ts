import { getAggregatedWords } from '../../../API/aggregatedWordsAPI';
import strings, { filterAggregate } from '../../../constants';
import createElement from '../../../helpers';
import { Word } from '../../../Interfaces';
import renderWord from '../view/renderWord';
import playSound from './musicController';
import removeFromHard from './removeWordsController';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const isHardLevel = () => {
  const filter = filterAggregate.hard;
  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
  const pagination = document.querySelector('.pagination') as HTMLDivElement;
  pagination.style.display = 'none';

  const hardWordsList = getAggregatedWords({ userId, token, filter });
  hardWordsList.then((response) => {
    response[0].paginatedResults.map((word: Word) => {
      const wordItem = createElement('div', 'word-item');
      wordsContainer.appendChild(wordItem);
      wordItem.append(renderWord(word));

      const hardWord = <HTMLElement>document.querySelector(`[data-hard="${word._id}"]`);
      hardWord.textContent = String(strings.complicated);
      const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${word._id}"]`);
      complicatedBtn.textContent = strings.easy;
      complicatedBtn.classList.add('easy-word');
      return wordItem;
    });
    playSound();
    removeFromHard();
  });
};

export default isHardLevel;
