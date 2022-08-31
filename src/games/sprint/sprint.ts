import { createElement, fillElement } from '../../helpers';
import { getWords } from '../../eBook/controller/wordsController';
import getNewValue from './timer/timer';
import { Sprint } from './sprint-enum';
import createModal from '../modal/modal';
import './sprint.scss';

const createAllElementsSprint = () => {
  const globeContainer = <HTMLElement>createElement('div', 'game-container');
  const sprintTitle = <HTMLElement>createElement('div', 'sprint-title');
  const sprintScore = <HTMLElement>createElement('div', 'sprint-score');
  const sprintScoreNum = <HTMLElement>createElement('div', 'sprint-score-num');
  const sprintLevl = <HTMLElement>createElement('div', 'sprint-levl');
  const sprintContainer = <HTMLElement>createElement('div', 'sprint-container');
  const sprintTimer = <HTMLElement>(
    createElement('div', 'sprint-container__timer')
  );
  const sprintViewResults = <HTMLElement>(
    createElement('div', 'sprint-container__view-results')
  );
  const sprintWordEn = <HTMLElement>(
    createElement('div', 'sprint-container__word-en')
  );
  const sprintWordRu = <HTMLElement>(
    createElement('div', 'sprint-container__word-ru')
  );
  const sprintGameBtnContainer = <HTMLElement>(
    createElement('div', 'game-btn__container')
  );
  const sprintGameBtnFalse = <HTMLElement>(
    createElement('button', 'game-btn__container-false')
  );
  const sprintGameBtnTrue = <HTMLElement>(
    createElement('button', 'game-btn__container-true')
  );

  return [
    globeContainer,
    sprintTitle,
    sprintLevl,
    sprintContainer,
    sprintTimer,
    sprintViewResults,
    sprintWordEn,
    sprintWordRu,
    sprintGameBtnContainer,
    sprintGameBtnFalse,
    sprintGameBtnTrue,
    sprintScore,
    sprintScoreNum,
  ];
};

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

const randomNumber = (num: number) => {
  return Math.floor(Math.random() * num);
};

async function getWordToSprint(
  page: number,
  group: number,
  enWord: HTMLElement,
  ruWord: HTMLElement
) {
  const randomChoise = randomNumber(2);
  const randomNum1 = randomNumber(21);
  const randomNum2 = randomNumber(21);

  if (randomChoise === 0) {
    getWords(page, group).then((response) => {
      enWord.textContent = response[randomNum1].word;
      ruWord.textContent = response[randomNum1].wordTranslate;
    });
  } else if (randomChoise === 1) {
    getWords(page, group).then((response) => {
      enWord.textContent = response[randomNum1].word;
      ruWord.textContent = response[randomNum2].wordTranslate;
    });
  }
}

const getResultOfGame = () => {
  const placeResult = <HTMLElement>document.querySelector('.sprint-score-num');
  const results: number = Number(placeResult.textContent) + 10;
  placeResult.textContent = `${results}`;
};

const sprintGameBtn = (
  choise: string,
  page: number,
  group: number,
  enWord: HTMLElement,
  ruWord: HTMLElement
) => {
  const [useElem, useElemTrue, useElemFalse] = findAllElementsSprint();

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

    if (flag) {
      (<HTMLElement>useElem).classList.remove('sprint-container__view-element');
      (<HTMLElement>useElem).classList.add(
        'sprint-container__view-element-true'
      );
    } else if (!flag) {
      (<HTMLElement>useElem).classList.remove('sprint-container__view-element');
      (<HTMLElement>useElem).classList.add(
        'sprint-container__view-element-false'
      );
    }
  });

  if (
    (<NodeListOf<Element>>useElemTrue).length +
      (<NodeListOf<Element>>useElemFalse).length ===
    19
  ) {
    createModal();
  } else {
    getWordToSprint(page, group, enWord, ruWord);
  }
};

const createSprint = (place: HTMLElement, lev: string | null) => {
  const [
    globeContainer,
    sprintTitle,
    sprintLevl,
    sprintContainer,
    sprintTimer,
    sprintViewResults,
    sprintWordEn,
    sprintWordRu,
    sprintGameBtnContainer,
    sprintGameBtnFalse,
    sprintGameBtnTrue,
    sprintScore,
    sprintScoreNum,
  ] = createAllElementsSprint();
  const randomPage = randomNumber(31);
  const gameLevl = Number(lev);

  fillElement(
    sprintViewResults,
    20,
    'div',
    'sprint-container__view-element',
    'element',
    false
  );

  sprintLevl.textContent = Sprint.levl + lev;
  sprintScore.textContent = Sprint.title;
  sprintTimer.textContent = Sprint.timer;
  sprintGameBtnFalse.textContent = Sprint.btnFalse;
  sprintGameBtnTrue.textContent = Sprint.btnTrue;

  sprintGameBtnTrue.addEventListener('click', () => {
    sprintGameBtn('true', randomPage, gameLevl, sprintWordEn, sprintWordRu);
  });
  sprintGameBtnFalse.addEventListener('click', () => {
    sprintGameBtn('false', randomPage, gameLevl, sprintWordEn, sprintWordRu);
  });

  getWordToSprint(randomPage, gameLevl, sprintWordEn, sprintWordRu);
  getNewValue(sprintTimer);

  sprintGameBtnContainer.append(sprintGameBtnFalse, sprintGameBtnTrue);
  sprintContainer.append(
    sprintTimer,
    sprintViewResults,
    sprintWordEn,
    sprintWordRu,
    sprintGameBtnContainer
  );
  sprintTitle.append(sprintScore, sprintScoreNum);
  globeContainer.append(sprintLevl, sprintTitle, sprintContainer);
  place.append(globeContainer);

  return place;
};

export default createSprint;
