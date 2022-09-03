import { removeAllChildNodes } from '../../helpers';
import { getWords } from '../../API/wordsAPI';
import createGameSlot from './game-components/game-slot/game-slot';
import createSprintMenu from './sprint/sprint-menu/sprint-menu';
import renderGamePage from './game-components/game-menu/game-menu';
import createModal from './game-components/modal/modal';
import createSprint from './sprint/sprint';

// MODAL
const renderModal = () => {
  const [wrapper, wrapperMain, modalBtnReapet, modalBtnMenu] = createModal();

  (<HTMLElement>modalBtnReapet).addEventListener('click', () => {
    removeAllChildNodes(<HTMLElement>wrapperMain);
    (<HTMLElement>wrapper).firstChild?.remove();
    renderSprintMenu(<HTMLElement>wrapper);
  });

  (<HTMLElement>modalBtnMenu).addEventListener('click', () => {
    removeAllChildNodes(<HTMLElement>wrapperMain);
    (<HTMLElement>wrapper).firstChild?.remove();
    renderGameMenu();
  });
};

// SPRINT
const renderSprint = (place: HTMLElement, lev: string | null) => {
  const [
    sprintGameBtnTrue,
    sprintGameBtnFalse,
    randomPage,
    gameLevl,
    sprintWordEn,
    sprintWordRu,
    sprintTimer,
  ] = createSprint(place, lev);

  const findAllElementsSprint = () => {
    const useElem = <HTMLElement>(
      document.querySelector('.sprint-container__view-element')
    );
    const useElemTrue = <NodeListOf<Element>>(
      document.querySelectorAll('.sprint-container__view-element-true')
    );
    const useElemFalse = <NodeListOf<Element>>(
      document.querySelectorAll('.sprint-container__view-element-false')
    );

    return [useElem, useElemTrue, useElemFalse];
  };

  const randomNumber = (num: number) => Math.floor(Math.random() * num);

  async function getWordToSprint(
    page: number,
    group: number,
    enWord: HTMLElement,
    ruWord: HTMLElement,
  ) {
    const randomChoise = randomNumber(2);
    const randomNum1 = randomNumber(21);
    const randomNum2 = randomNumber(21);
    const enWordParam = enWord;
    const ruWordParam = ruWord;

    if (randomChoise === 0) {
      getWords(page, group).then((response) => {
        enWordParam.textContent = response[randomNum1].word;
        ruWordParam.textContent = response[randomNum1].wordTranslate;
      });
    } else if (randomChoise === 1) {
      getWords(page, group).then((response) => {
        enWordParam.textContent = response[randomNum1].word;
        ruWordParam.textContent = response[randomNum2].wordTranslate;
      });
    }
  }

  const getResultOfGame = () => {
    const placeResult = <HTMLElement>(
      document.querySelector('.sprint-score-num')
    );
    const results: number = Number(placeResult.textContent) + 10;
    placeResult.textContent = `${results}`;
  };

  const getResultView = (flag: boolean, useElem: HTMLElement) => {
    if (flag) {
      useElem.classList.remove('sprint-container__view-element');
      useElem.classList.add('sprint-container__view-element-true');
    } else if (!flag) {
      useElem.classList.remove('sprint-container__view-element');
      useElem.classList.add('sprint-container__view-element-false');
    }
  };

  const getNewValue = (placeTimer: HTMLElement) => {
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

    localStorage.setItem('bestSeriesSprint', `${bestScore}`);
  };

  const sprintGameBtn = (
    choise: string,
    page: number,
    group: number,
    enWord: HTMLElement,
    ruWord: HTMLElement,
  ) => {
    const [useElem, useElemTrue, useElemFalse] = findAllElementsSprint();

    getWords(page, group).then((response) => {
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
        }
      }

      getResultView(flag, <HTMLElement>useElem);
    });

    if (
      (<NodeListOf<Element>>useElemTrue).length
        + (<NodeListOf<Element>>useElemFalse).length
      === 19
    ) {
      getBestSeriesAnswer();
      renderModal();
    } else {
      getWordToSprint(page, group, enWord, ruWord);
    }
  };

  (<HTMLElement>sprintGameBtnTrue).addEventListener('click', () => {
    sprintGameBtn(
      'true',
      <number>randomPage,
      <number>gameLevl,
      <HTMLElement>sprintWordEn,
      <HTMLElement>sprintWordRu,
    );
  });
  (<HTMLElement>sprintGameBtnFalse).addEventListener('click', () => {
    sprintGameBtn(
      'false',
      <number>randomPage,
      <number>gameLevl,
      <HTMLElement>sprintWordEn,
      <HTMLElement>sprintWordRu,
    );
  });

  getWordToSprint(
    <number>randomPage,
    <number>gameLevl,
    <HTMLElement>sprintWordEn,
    <HTMLElement>sprintWordRu,
  );
  getNewValue(<HTMLElement>sprintTimer);
};

// SPRINT-MENU
const renderSprintMenu = (place: HTMLElement) => {
  const sprintMenuBtnStart = createSprintMenu(place);

  sprintMenuBtnStart.addEventListener('click', () => {
    const wrapperMain = <HTMLElement>document.querySelector('.main__wrapper');
    const choseLvl = <HTMLSelectElement>(
      document.querySelector('.menu-btn__complexity')
    );
    const levl = choseLvl.value;

    removeAllChildNodes(wrapperMain);
    renderSprint(wrapperMain, levl);
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