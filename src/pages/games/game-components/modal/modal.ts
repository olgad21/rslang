import { createElement, removeAllChildNodes } from '../../../../helpers';
import createSprintMenu from '../../sprint/sprint-menu/sprint-menu';
import { Modal } from '../../sprint/sprint-enum';
import { renderGamePage } from '../game-menu/game-menu';

const createAllElementsModal = () => {
  const modalContainer = createElement('div', 'modal__container');
  const modalWindow = createElement('div', 'modal__container-window');
  const modalTitle = createElement('div', 'modal__container-title');
  const modalContent = createElement('div', 'modal__container-content');
  const wordsCorrect = createElement('div', 'modal__container-content-correct');
  const wordsWrong = createElement('div', 'modal__container-content-wrong');
  const modalFooter = createElement('div', 'modal__container-footer');
  const modalBtnReapet = createElement('button', 'modal__container-btn-reapet');
  const modalBtnMenu = createElement('button', 'modal__container-btn-menu');

  return [
    modalContainer,
    modalWindow,
    modalTitle,
    modalContent,
    wordsCorrect,
    wordsWrong,
    modalFooter,
    modalBtnReapet,
    modalBtnMenu,
  ];
};

const findAllElemntsModal = () => {
  const wrapper = <HTMLElement>document.querySelector('.wrapper');
  const wrapperMain = <HTMLElement>document.querySelector('.main__wrapper');
  const results = Number(
    (<HTMLElement>document.querySelector('.sprint-score-num')).textContent
  );
  const resultsTrue: number = (<NodeListOf<Element>>(
    document.querySelectorAll('.sprint-container__view-element-true')
  )).length;

  const resultsFalse: number = (<NodeListOf<Element>>(
    document.querySelectorAll('.sprint-container__view-element-false')
  )).length;

  return [wrapper, wrapperMain, results, resultsTrue, resultsFalse];
};

const createModal = () => {
  const [
    modalContainer,
    modalWindow,
    modalTitle,
    modalContent,
    wordsCorrect,
    wordsWrong,
    modalFooter,
    modalBtnReapet,
    modalBtnMenu,
  ] = createAllElementsModal();

  const [wrapper, wrapperMain, results, resultsTrue, resultsFalse] =
    findAllElemntsModal();

  modalTitle.textContent = Modal.yourResults + results;
  wordsCorrect.textContent = `${Modal.correctAnswer}${resultsTrue}`;
  wordsWrong.textContent = `${Modal.incorrectAnswer}${resultsFalse}`;
  modalBtnReapet.textContent = Modal.return;
  modalBtnMenu.textContent = Modal.menu;

  modalBtnReapet.addEventListener('click', () => {
    removeAllChildNodes(<HTMLElement>wrapperMain);
    (<HTMLElement>wrapper).firstChild?.remove();
    createSprintMenu(<HTMLElement>wrapperMain);
  });

  modalBtnMenu.addEventListener('click', () => {
    removeAllChildNodes(<HTMLElement>wrapperMain);
    (<HTMLElement>wrapper).firstChild?.remove();
    renderGamePage();
  });

  modalFooter.append(modalBtnReapet, modalBtnMenu);
  modalContent.append(wordsCorrect, wordsWrong);
  modalWindow.append(modalTitle, modalContent, modalFooter);
  modalContainer.append(modalWindow);
  (<HTMLElement>wrapper).prepend(modalContainer);

  return wrapper;
};

export default createModal;
