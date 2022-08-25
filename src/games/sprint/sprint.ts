import { createElement } from '../../helpers';
import './sprint.scss';

const createSprint = (place: HTMLElement, levl: string | null) => {
  const globeContainer = <HTMLElement>createElement('div', 'game-container');
  const sprintTitle = <HTMLElement>createElement('div', 'sprint-title');
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
    createElement('button', 'game-btn__false')
  );
  const sprintGameBtnTrue = <HTMLElement>(
    createElement('button', 'game-btn__true')
  );

  sprintTitle.textContent = 'sprintTitle';
  sprintLevl.textContent = levl;
  sprintContainer.textContent = 'sprintContainer';
  sprintTimer.textContent = 'sprintTimer';
  sprintViewResults.textContent = 'sprintViewResults';
  sprintWordEn.textContent = 'sprintWordEn';
  sprintWordRu.textContent = 'sprintWordRu';
  sprintGameBtnContainer.textContent = 'sprintGameBtnContainer';
  sprintGameBtnFalse.textContent = 'sprintGameBtnFalse';
  sprintGameBtnTrue.textContent = 'sprintGameBtnTrue';

  sprintGameBtnContainer.append(sprintGameBtnFalse, sprintGameBtnTrue);
  sprintContainer.append(
    sprintTimer,
    sprintViewResults,
    sprintWordEn,
    sprintWordRu,
    sprintGameBtnContainer
  );
  globeContainer.append(sprintLevl, sprintTitle, sprintContainer);
  place.append(globeContainer);

  return place;
};

export default createSprint;
