/* eslint-disable @typescript-eslint/no-use-before-define */

import { removeAllChildNodes } from '../../helpers';
import { getWords } from '../../API/wordsAPI';
import createGameSlot from './game-components/game-slot/game-slot';
import createSprintMenu from './sprint/sprint-menu/sprint-menu';
import renderGamePage from './game-components/game-menu/game-menu';
import createModal from './game-components/modal/modal';
import { statisticsBase, wordBase } from '../../constants';
import { BaseStatistics } from '../../Interfaces';
import {
  getUserStatistics,
  updateUserStatistics,
} from '../../API/userStatustics';
import {
  getUserWord,
  updateUserWord,
  createUserWord,
} from '../../API/userWordAPI';
import {
  createSprint,
  getResultView,
  randomNumber,
  getResultOfGame,
  findAllElementsSprint,
} from './sprint/sprint';

// MODAL
const renderModal = () => {
  const [wrapper, wrapperMain, modalBtnReapet, modalBtnMenu] = createModal();

  (<HTMLElement>modalBtnReapet).addEventListener('click', () => {
    removeAllChildNodes(<HTMLElement>wrapperMain);
    (<HTMLElement>wrapper).firstChild?.remove();
    renderSprintMenu(<HTMLElement>wrapperMain);
  });

  (<HTMLElement>modalBtnMenu).addEventListener('click', () => {
    removeAllChildNodes(<HTMLElement>wrapperMain);
    (<HTMLElement>wrapper).firstChild?.remove();
    renderGameMenu();
  });
};

// SPRINT
const renderSprint = (group: number, page: number) => {
  // все переменные
  const place = <HTMLElement>document.querySelector('.main__wrapper');
  removeAllChildNodes(place);

  const [
    sprintGameBtnTrue,
    sprintGameBtnFalse,
    randomPage,
    gameLevl,
    sprintWordEn,
    sprintWordRu,
    sprintTimer,
  ] = createSprint(group, page);
  const usedWords: string[] = [];
  const wordsPage = page;

  // проверка правильности перевода
  async function getWordToSprint(
    pageWord: number,
    groupWord: number,
    enWord: HTMLElement,
    ruWord: HTMLElement,
  ) {
    const randomChoise = randomNumber(2);
    const randomNum1 = randomNumber(20);
    const randomNum2 = randomNumber(20);
    const enWordParam = enWord;
    const ruWordParam = ruWord;
    const pageParam = pageWord;
    const groupParam = groupWord;

    if (randomChoise === 0) {
      getWords(pageParam, groupParam).then(async (response) => {
        const wordBaseEn = <string>response[randomNum1].word;
        const wordBaseRu = <string>response[randomNum1].wordTranslate;

        if (!usedWords.includes(wordBaseEn)) {
          enWordParam.textContent = wordBaseEn;
          ruWordParam.textContent = wordBaseRu;
          usedWords.push(wordBaseEn);

          if (localStorage.getItem('user_id')) {
            const userId = <string>localStorage.getItem('user_id');
            const token = <string>localStorage.getItem('token');
            const wordId = response[randomNum1].id;
            const userWord = getUserWord({
              userId,
              wordId,
              token,
            });

            if (userWord.status === 404) {
              wordBase.optional.attemp = 1;
              wordBase.optional.isNewWord = true;
              createUserWord({
                userId,
                wordId,
                token,
                wordBase,
              });
            }
          }
        } else {
          getWordToSprint(pageParam, groupParam, enWordParam, ruWordParam);
        }
      });
    } else if (randomChoise === 1) {
      getWords(page, group).then((response) => {
        const wordBaseEn = <string>response[randomNum1].word;
        const wordBaseRu = <string>response[randomNum2].wordTranslate;
        if (!usedWords.includes(wordBaseEn)) {
          enWordParam.textContent = wordBaseEn;
          ruWordParam.textContent = wordBaseRu;
          usedWords.push(wordBaseEn);
        } else {
          getWordToSprint(pageParam, groupParam, enWordParam, ruWordParam);
        }
      });
    }
  }

  getResultOfGame();

  // таймер
  const timer = (placeTimer: HTMLElement) => {
    const prevValue: number = parseInt(<string>placeTimer.textContent, 10);
    let nextValue: number = prevValue - 1;
    const placeTimerParam = placeTimer;

    const timerNum = setInterval(() => {
      if (nextValue === 0) {
        clearInterval(timerNum);
        renderModal();
      } else {
        placeTimerParam.textContent = '';
        placeTimerParam.textContent = String(<number>nextValue);
        nextValue -= 1;
      }
    }, 1000);
  };

  // возврат лучшей серии ответов
  const getBestSeriesAnswer = () => {
    const allResultsContainer = <HTMLElement>(
      document.querySelector('.sprint-container__view-results')
    );
    const allResultsArray = Array.from(allResultsContainer.children);
    let flag = false;
    let count = 1;
    let bestScore = 0;

    for (let i = 0; i < allResultsArray.length; i += 1) {
      if (
        allResultsArray[i].classList.contains(
          'sprint-container__view-element-true',
        )
        && flag
      ) {
        count += 1;
      } else if (
        allResultsArray[i].classList.contains(
          'sprint-container__view-element-true',
        )
        && !flag
      ) {
        flag = true;
        count = 1;
      } else if (
        allResultsArray[i].classList.contains(
          'sprint-container__view-element-false',
        )
      ) {
        bestScore = count;
        flag = false;
      }
    }

    if (localStorage.getItem('user_id')) {
      const userId = <string>localStorage.getItem('user_id');
      const token = <string>localStorage.getItem('token');
      getUserStatistics({ userId, token }).then((response) => {
        if (response.optional.bestScore.ok) {
          if (response.optional.bestScore < bestScore) {
            statisticsBase.optional.sprintBestScore = bestScore;
            const statistics: BaseStatistics = statisticsBase;
            updateUserStatistics({
              userId,
              token,
              statistics,
            });
          }
        } else {
          statisticsBase.optional.sprintBestScore = bestScore;
          const statistics: BaseStatistics = statisticsBase;
          updateUserStatistics({
            userId,
            token,
            statistics,
          });
        }
      });
    }
  };

  // вызов по нажатию кнопки
  const sprintGameBtn = (
    choise: string,
    pageW: number,
    groupW: number,
    enWord: HTMLElement,
    ruWord: HTMLElement,
  ) => {
    const [useElem] = findAllElementsSprint();

    getWords(pageW, groupW).then(async (response) => {
      let flag = false;
      for (let i = 0; i < response.length; i += 1) {
        if (
          (enWord.textContent === response[i].word
            && ruWord.textContent === response[i].wordTranslate
            && choise === 'true')
          || (enWord.textContent === response[i].word
            && ruWord.textContent !== response[i].wordTranslate
            && choise === 'false')
        ) {
          (<HTMLElement>useElem).classList.remove(
            'sprint-container__view-element',
          );
          (<HTMLElement>useElem).classList.add(
            'sprint-container__view-element-true',
          );
          flag = true;
          getResultOfGame();

          if (localStorage.getItem('user_id')) {
            const userId = <string>localStorage.getItem('user_id');
            const token = <string>localStorage.getItem('token');
            const wordId = response[i].id;
            const userWord = await getUserWord({ userId, wordId, token });

            userWord.json().then((data) => {
              wordBase.difficulty = data.difficulty;
              wordBase.optional.attemp = data.optional.attemp + 1;
              wordBase.optional.isNewWord = data.optional.isNewWord;
              wordBase.optional.sprintNew = data.optional.sprintNew;
              wordBase.optional.audioNew = data.optional.audioNew;
              wordBase.optional.guesses = data.optional.guesses + 1;
              wordBase.optional.error = data.optional.error;
              wordBase.optional.isLearned = data.optional.isLearned;
              wordBase.optional.sprintLearned = data.optional.sprintLearned;
              wordBase.optional.audioLearned = data.optional.audioLearned;
              wordBase.optional.date = data.optional.date;
              if (data.optional.guesses >= 3) {
                wordBase.optional.dateSprintLearned = String(Date.now());
              } else {
                wordBase.optional.dateSprintLearned = data.optional.dateSprintLearned;
              }
              wordBase.optional.dateAudioLearned = data.optional.dateAudioLearned;
              wordBase.optional.dateSprintNew = String(Date.now());
              wordBase.optional.dateAudioNew = data.optional.dateAudioLearned;
              wordBase.optional.dateLearned = data.optional.dateLearned;

              updateUserWord({
                userId,
                wordId,
                token,
                wordBase,
              });
            });
          }
        } else if (localStorage.getItem('user_id')) {
          const userId = <string>localStorage.getItem('user_id');
          const token = <string>localStorage.getItem('token');
          const wordId = response[i].id;
          const userWord = await getUserWord({ userId, wordId, token });

          userWord.json().then((data) => {
            wordBase.difficulty = data.difficulty;
            wordBase.optional.attemp = data.optional.attemp + 1;
            wordBase.optional.isNewWord = data.optional.isNewWord;
            wordBase.optional.sprintNew = data.optional.sprintNew;
            wordBase.optional.audioNew = data.optional.audioNew;
            wordBase.optional.guesses = data.optional.guesses;
            wordBase.optional.error = data.optional.error + 1;
            if (data.optional.error > 3) {
              wordBase.optional.isLearned = false;
            } else {
              wordBase.optional.isLearned = data.optional.isLearned;
            }
            wordBase.optional.sprintLearned = data.optional.sprintLearned;
            wordBase.optional.audioLearned = data.optional.audioLearned;
            wordBase.optional.date = data.optional.date;
            wordBase.optional.dateSprintLearned = data.optional.dateSprintLearned;
            wordBase.optional.dateAudioLearned = data.optional.dateAudioLearned;
            wordBase.optional.dateSprintNew = data.optional.dateSprintNew;
            wordBase.optional.dateAudioNew = data.optional.dateAudioLearned;
            wordBase.optional.dateLearned = data.optional.dateLearned;

            updateUserWord({
              userId,
              wordId,
              token,
              wordBase,
            });
          });
        }
      }

      getResultView(flag, <HTMLElement>useElem);
    });

    getWordToSprint(page, group, enWord, ruWord);
  };

  // кнопки
  (<HTMLElement>sprintGameBtnTrue).addEventListener('click', () => {
    sprintGameBtn(
      'true',
      <number>wordsPage,
      <number>gameLevl,
      <HTMLElement>sprintWordEn,
      <HTMLElement>sprintWordRu,
    );
  });
  (<HTMLElement>sprintGameBtnFalse).addEventListener('click', () => {
    sprintGameBtn(
      'false',
      <number>wordsPage,
      <number>gameLevl,
      <HTMLElement>sprintWordEn,
      <HTMLElement>sprintWordRu,
    );
  });

  // отслеживает, когда наьерется 20 ответов
  const observer = setInterval(() => {
    const useElemTrue = <NodeListOf<Element>>(
      document.querySelectorAll('.sprint-container__view-element-true')
    );
    const useElemFalse = <NodeListOf<Element>>(
      document.querySelectorAll('.sprint-container__view-element-false')
    );

    if (
      (<NodeListOf<Element>>useElemTrue).length
        + (<NodeListOf<Element>>useElemFalse).length
      === 20
    ) {
      clearInterval(observer);
      getBestSeriesAnswer();
      renderModal();
    }
  }, 1000);

  // первое слово при начале игры
  getWordToSprint(
    <number>randomPage,
    <number>gameLevl,
    <HTMLElement>sprintWordEn,
    <HTMLElement>sprintWordRu,
  );

  timer(<HTMLElement>sprintTimer);
};

// SPRINT-MENU
const renderSprintMenu = (place: HTMLElement) => {
  const sprintMenuBtnStart = createSprintMenu(place);

  sprintMenuBtnStart.addEventListener('click', () => {
    const choseLvl = <HTMLSelectElement>(
      document.querySelector('.menu-btn__complexity')
    );
    const page: number = randomNumber(31);
    const levl = Number(choseLvl.value);

    renderSprint(levl, page);
  });
};

// GAME-MENU
const renderGameMenu = () => {
  const [wrapper, game, wrapperMain, sprint] = renderGamePage();

  sprint.addEventListener('click', () => {
    removeAllChildNodes(wrapperMain);
    renderSprintMenu(wrapperMain);
  });

  createGameSlot(game, 'АУДИОВЫЗОВ');
  removeAllChildNodes(wrapperMain);

  wrapperMain.append(wrapper);
  wrapper.append(game);
};

export default renderGameMenu;
