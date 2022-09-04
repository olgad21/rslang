import createElement, { fillElement } from '../../../helpers';
import { Sprint } from './sprint-enum';
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

const randomNumber = (num: number) => Math.floor(Math.random() * num);

const createSprint = (lev: number | null, group: number) => {
  const place = <HTMLElement>document.querySelector('.main__wrapper');

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

  const randomPage = group;
  const gameLevl = lev;

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

  return [
    sprintGameBtnTrue,
    sprintGameBtnFalse,
    randomPage,
    gameLevl,
    sprintWordEn,
    sprintWordRu,
    sprintTimer,
  ];
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

const getResultOfGame = () => {
  const placeResult = <HTMLElement>document.querySelector('.sprint-score-num');
  const results: number = Number(placeResult.textContent) + 10;
  placeResult.textContent = `${results}`;
};

export {
  createSprint,
  getResultView,
  randomNumber,
  getResultOfGame,
  findAllElementsSprint,
};
