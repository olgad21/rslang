/* eslint-disable no-console */
import { Chart, registerables } from 'chart.js';
import { getAggregatedWords } from '../../API/aggregatedWordsAPI';
import { getUserStatistics } from '../../API/userStatustics';
import { getAllUserWords } from '../../API/userWordAPI';
import strings, { filterAggregate } from '../../constants';
import createElement, { removeAllChildNodes } from '../../helpers';
import { ExtendUserWord } from '../../Interfaces';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const filterWordsByDate = (
  words: { userWord: { optional: { date: string } } }[],
) => words.filter((word) => {
  const { date } = word.userWord.optional;
  const now = Date.now();
  const dayBefore = now - 24 * 60 * 60 * 1000;
  return dayBefore <= Number(date);
});

const updateWordsStatistics = async (
  userWords: ExtendUserWord[],
) => {
  let filteredNewWordsByDate = [];
  let filteredLearnedWordsByDate = [];
  let filter = filterAggregate.isNewWord;
  const newWordsList = await getAggregatedWords({ userId, token, filter });
  filter = filterAggregate.isLearned;
  const learnedWordsList = await getAggregatedWords({ userId, token, filter });
  console.log(newWordsList, 'learnedaggregated');

  const dailyNewWords = document.querySelector('[data-id="daily-new-words"]') as HTMLElement;
  let dailyNewWordsNumber = 0;

  if (newWordsList[0].paginatedResults.length > 0) {
    filteredNewWordsByDate = filterWordsByDate(newWordsList[0].paginatedResults);
    dailyNewWordsNumber = filteredNewWordsByDate.length;
  }
  const dailyLearnedWords = document.querySelector('[data-id="daily-learned-words"]') as HTMLElement;
  let dailyLearnedWordsNumber = 0;

  if (learnedWordsList[0].paginatedResults.length > 0) {
    filteredLearnedWordsByDate = filterWordsByDate(learnedWordsList[0].paginatedResults);
    dailyLearnedWordsNumber = filteredLearnedWordsByDate.length;
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
    dailyRightWordsNumber = Math.round((allGuesses / allAttempts) * 100);
  }

  dailyNewWords.textContent = dailyNewWordsNumber.toString();
  dailyLearnedWords.textContent = dailyLearnedWordsNumber.toString();
  dailyRightWords.textContent = dailyRightWordsNumber.toString();
};

const updateGameStatistics = (userWords: ExtendUserWord[]) => {
  const allGamesData = document.querySelectorAll('[data-game]');

  Array.from(allGamesData).forEach(async (game) => {
    const gameNewWords = game.querySelector('[data-id="new-words"]') as HTMLElement;
    let gameNewWordsNumber = 0;

    const gameLearnedWords = game.querySelector('[data-id="learned-words"]') as HTMLElement;
    let gameLearnedWordsNumber = 0;

    const gameRightWords = game.querySelector('[data-id="right-words"]') as HTMLElement;
    let gameRightWordsNumber = 0;

    try {
      gameRightWordsNumber = await getUserStatistics({ userId, token });
      console.log(gameRightWordsNumber, 'gameStats');
    } catch {
      gameRightWordsNumber = 0;
    }

    const now = Date.now();
    const dayBefore = now - 24 * 60 * 60 * 1000;

    if ((game as HTMLElement).dataset.game === 'Спринт') {
      userWords.forEach((word) => {
        if (word.optional.sprintNew) {
          const { dateSprintNew } = word.optional;
          if (dayBefore <= Number(dateSprintNew)) {
            gameNewWordsNumber += 1;
          }

          if (word.optional.sprintLearned) {
            const { dateSprintLearned } = word.optional;
            if (dayBefore <= Number(dateSprintLearned)) {
              gameLearnedWordsNumber += 1;
            }
          }
        }
      });
    }

    if ((game as HTMLElement).dataset.game === 'Аудиовызов') {
      userWords.forEach((word) => {
        if (word.optional.audioNew) {
          const { dateAudioNew } = word.optional;
          if (dayBefore <= Number(dateAudioNew)) {
            gameNewWordsNumber += 1;
          }
          const { dateAudioLearned } = word.optional;
          if (word.optional.audioLearned) {
            if (dayBefore <= Number(dateAudioLearned)) {
              gameLearnedWordsNumber += 1;
            }
          }
        }
      });
    }

    gameNewWords.textContent = gameNewWordsNumber.toString();
    gameLearnedWords.textContent = gameLearnedWordsNumber.toString();
    gameRightWords.textContent = gameRightWordsNumber.toString();
  });
};

const updateAllTimeStatistics = (userWords: ExtendUserWord[]) => {
  const getDateLabel = (millisec: string) => {
    const date = new Date(Number(millisec));
    const dateNum = date.getDate();
    const month = MONTHS[date.getMonth()];
    return `${dateNum} ${month}`;
  };
  // для проверки!

  // userWords.forEach((word) => {
  //   if (word.optional.isLearned) {
  //     console.log('new date', new Date(Number(word.optional.date)), '|   learned date', new Date(Number(word.optional.dateLearned)));
  //   }
  // });

  const newWords = userWords.filter((word) => word.optional.isNewWord);
  const learnedWords = userWords.filter((word) => word.optional.isLearned);
  console.log(learnedWords.length, 'learnedLong');
  console.log(newWords.length, 'newWordsLong');

  const newWordsDates = newWords.map((word) => getDateLabel(word.optional.date));
  const learnedWordsDates = learnedWords.map((word) => getDateLabel(word.optional.dateLearned));

  const uniqueDatesLabels = [...new Set([...newWordsDates, ...learnedWordsDates])];

  const newWordsData = new Array<number>((new Set(newWordsDates).size)).fill(0);
  const learnedWordsData = new Array<number>((new Set(learnedWordsDates).size)).fill(0);

  uniqueDatesLabels.forEach((label, index) => {
    newWords.forEach((word) => {
      if (label === getDateLabel(word.optional.date)) {
        newWordsData[index] += 1;
      }
    });

    learnedWords.forEach((word) => {
      if (label === getDateLabel(word.optional.dateLearned)) {
        learnedWordsData[index] += 1;
      }
    });
  });

  console.log(newWordsData, learnedWordsData, 222);

  const data = {
    labels: uniqueDatesLabels,
    datasets: [{
      label: 'Новые слова',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: newWordsData,
    }, {
      label: 'Изученные слова',
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: learnedWordsData,
    }],
  };

  const chartEl = document.getElementsByClassName('chart')[0] as HTMLCanvasElement;

  if (chartEl) {
    Chart.register(...registerables);

    const myChart = new Chart(
      document.getElementsByClassName('chart')[0] as HTMLCanvasElement,
      {
        type: 'line',
        data,
      },
    );

    myChart.draw();
  }
};

const updateStatistics = async () => {
  let userWords: ExtendUserWord[] = [];
  try {
    userWords = await getAllUserWords({ userId, token });
  } catch (error) {
    const errorMessage = createElement('div', 'stats__error-message');
    errorMessage.textContent = strings.needLogin;
    const allStatsContainer = document.querySelector('.canvas-container') as HTMLElement;
    removeAllChildNodes(allStatsContainer);
    allStatsContainer?.append(errorMessage);
  }
  updateWordsStatistics(userWords);
  updateGameStatistics(userWords);
  updateAllTimeStatistics(userWords);
};

export default updateStatistics;
