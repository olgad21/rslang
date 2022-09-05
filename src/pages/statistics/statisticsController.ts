import { Chart, registerables } from 'chart.js';
import { getUserStatistics } from '../../API/userStatustics';
import { getAllUserWords } from '../../API/userWordAPI';
import strings, { statsStrings } from '../../constants';
import createElement, { removeAllChildNodes } from '../../helpers';
import { ExtendUserWord } from '../../Interfaces';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const filterWordsByDate = (
  date: string,
) => {
  const now = Date.now();
  const dayBefore = now - 24 * 60 * 60 * 1000;
  return dayBefore <= Number(date);
};

const updateWordsStatistics = async (
  userWords: ExtendUserWord[],
) => {
  const dailyNewWords = document.querySelector('[data-id="daily-new-words"]') as HTMLElement;
  const dailyNewWordsNumber = userWords.filter((word) => word.optional.isNewWord && filterWordsByDate(word.optional.date)).length;

  const dailyLearnedWords = document.querySelector('[data-id="daily-learned-words"]') as HTMLElement;
  const dailyLearnedWordsNumber = userWords.filter((word) => word.optional.isLearned && filterWordsByDate(word.optional.dateLearned)).length;

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

  const newWords = userWords.filter((word) => word.optional.isNewWord);
  const learnedWords = userWords.filter((word) => word.optional.isLearned);

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

  const data = {
    labels: uniqueDatesLabels,
    datasets: [{
      label: statsStrings.new,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: newWordsData,
    }, {
      label: statsStrings.learned,
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
