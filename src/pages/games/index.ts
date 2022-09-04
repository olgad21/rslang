/* eslint-disable */

import { removeAllChildNodes } from '../../helpers';
import { getWords } from '../../API/wordsAPI';
import createGameSlot from './game-components/game-slot/game-slot';
import createSprintMenu from './sprint/sprint-menu/sprint-menu';
import renderGamePage from './game-components/game-menu/game-menu';
import createModal from './game-components/modal/modal';
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
const renderSprint = (lev: string | null, group: number) => {
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
  ] = createSprint(place, lev);
  let usedWords: string[] = [];

  // проверка правильности перевода
  async function getWordToSprint(
    page: number,
    group: number,
    enWord: HTMLElement,
    ruWord: HTMLElement
  ) {
    const randomChoise = randomNumber(2);
    const randomNum1 = randomNumber(21);
    const randomNum2 = randomNumber(21);
    const enWordParam = enWord;
    const ruWordParam = ruWord;
    const pageParam = page;
    const groupParam = group;

    if (randomChoise === 0) {
      getWords(page, group).then((response) => {
        if (!usedWords.includes(<string>response[randomNum1].word)) {
          enWordParam.textContent = response[randomNum1].word;
          ruWordParam.textContent = response[randomNum1].wordTranslate;
          usedWords.push(response[randomNum1].word);
        } else {
          getWordToSprint(pageParam, groupParam, enWordParam, ruWordParam);
        }
      });
    } else if (randomChoise === 1) {
      getWords(page, group).then((response) => {
        if (!usedWords.includes(<string>response[randomNum1].word)) {
          enWordParam.textContent = response[randomNum1].word;
          ruWordParam.textContent = response[randomNum2].wordTranslate;
          usedWords.push(response[randomNum1].word);
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

    const timer = setInterval(() => {
      if (nextValue === 0) {
        clearInterval(timer);
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
          'sprint-container__view-element-true'
        ) &&
        flag
      ) {
        count += 1;
      } else if (
        allResultsArray[i].classList.contains(
          'sprint-container__view-element-true'
        ) &&
        !flag
      ) {
        flag = true;
        count = 1;
      } else if (
        allResultsArray[i].classList.contains(
          'sprint-container__view-element-false'
        )
      ) {
        bestScore = count;
        flag = false;
      }
    }

    localStorage.setItem('bestSeriesSprint', `${bestScore}`);
  };

  // вызов по нажатию кнопки
  const sprintGameBtn = (
    choise: string,
    page: number,
    group: number,
    enWord: HTMLElement,
    ruWord: HTMLElement
  ) => {
    const [useElem] = findAllElementsSprint();

    getWords(page, group).then((response) => {
      let flag = false;
      for (let i = 0; i < response.length; i += 1) {
        if (
          (enWord.textContent === response[i].word &&
            ruWord.textContent === response[i].wordTranslate &&
            choise === 'true') ||
          (enWord.textContent === response[i].word &&
            ruWord.textContent !== response[i].wordTranslate &&
            choise === 'false')
        ) {
          (<HTMLElement>useElem).classList.remove(
            'sprint-container__view-element'
          );
          (<HTMLElement>useElem).classList.add(
            'sprint-container__view-element-true'
          );
          flag = true;
          getResultOfGame();
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
      <number>randomPage,
      <number>gameLevl,
      <HTMLElement>sprintWordEn,
      <HTMLElement>sprintWordRu
    );
  });
  (<HTMLElement>sprintGameBtnFalse).addEventListener('click', () => {
    sprintGameBtn(
      'false',
      <number>randomPage,
      <number>gameLevl,
      <HTMLElement>sprintWordEn,
      <HTMLElement>sprintWordRu
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
      (<NodeListOf<Element>>useElemTrue).length +
        (<NodeListOf<Element>>useElemFalse).length ===
      20
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
    <HTMLElement>sprintWordRu
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
    const levl = choseLvl.value;

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
