/* eslint-disable no-console */
import { getAggregatedWords } from '../../API/aggregatedWordsAPI';
import { getAllUserWords } from '../../API/userWordAPI';
import { filterAggregate } from '../../constants';
import { ExtendUserWord } from '../../Interfaces';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const updateWordsStatistics = async (
  userWords: ExtendUserWord[],
) => {
  let filter = filterAggregate.isNewWord;
  const newWordsList = await getAggregatedWords({ userId, token, filter });
  filter = filterAggregate.isLearned;
  const learnedWordsList = await getAggregatedWords({ userId, token, filter });

  console.log(newWordsList, 'newAggregate');
  console.log(learnedWordsList, 'learnedAggregated');
  const dailyNewWords = document.querySelector('[data-id="daily-new-words"]') as HTMLElement;
  let dailyNewWordsNumber = 0;
  if (newWordsList[0].totalCount) {
    dailyNewWordsNumber = newWordsList[0].paginatedResults.length;
  }
  const dailyLearnedWords = document.querySelector('[data-id="daily-learned-words"]') as HTMLElement;
  let dailyLearnedWordsNumber = 0;
  if (learnedWordsList[0].totalCount.length) {
    dailyLearnedWordsNumber = learnedWordsList[0].paginatedResults.length;
  }

  const dailyRightWords = document.querySelector('[data-id="daily-right-words"]') as HTMLElement;
  let dailyRightWordsNumber = 0;
  let allAttempts = 0;
  let allGuesses = 0;
  userWords.forEach((word) => {
    allAttempts += word.optional.attemp;
    allGuesses += word.optional.guesses;
  });
  if (allAttempts) {
    dailyRightWordsNumber = (allGuesses / allAttempts) * 100;
  }

  dailyNewWords.textContent = dailyNewWordsNumber.toString();
  dailyLearnedWords.textContent = dailyLearnedWordsNumber.toString();
  dailyRightWords.textContent = dailyRightWordsNumber.toString();
};

const updateGameStatistics = (userWords: ExtendUserWord[]) => {
  const allGamesData = document.querySelectorAll('[data-game]');

  Array.from(allGamesData).forEach((game) => {
    const gameNewWords = document.querySelector('[data-id="new-words"]') as HTMLElement;
    let gameNewWordsNumber = 0;

    const gameLearnedWords = document.querySelector('[data-id="learned-words"]') as HTMLElement;
    let gameLearnedWordsNumber = 0;

    const gameRightWords = document.querySelector('[data-id="right-words"]') as HTMLElement;
    const gameRightWordsNumber = 0; // TODO: дописать запрос для серии правильных ответов

    if ((game as HTMLElement).dataset.game === 'Спринт') {
      userWords.forEach((word) => {
        if (word.optional.sprintNew === true) {
          gameNewWordsNumber += 1;
        }
        if (word.optional.sprintLearned === true) {
          gameLearnedWordsNumber += 1;
        }
      });
    }

    if ((game as HTMLElement).dataset.game === 'Аудиовызов') {
      userWords.forEach((word) => {
        if (word.optional.audioNew === true) {
          gameNewWordsNumber += 1;
        }
        if (word.optional.audioLearned === true) {
          gameLearnedWordsNumber += 1;
        }
      });
    }

    gameNewWords.textContent = gameNewWordsNumber.toString();
    gameLearnedWords.textContent = gameLearnedWordsNumber.toString();
    gameRightWords.textContent = gameRightWordsNumber.toString();
  });
};

const updateDailyStatistics = async () => {
  const userWords = await getAllUserWords({ userId, token });
  console.log(userWords);
  updateWordsStatistics(userWords);
  updateGameStatistics(userWords);
};

export default updateDailyStatistics;
