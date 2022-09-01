import { createElement, removeAllChildNodes } from '../../../../helpers';
import createGameSlot from '../game-slot/game-slot';
import createSprintMenu from '../../sprint/sprint-menu/sprint-menu';
import './game-menu.scss';

const renderGameBackground = () => {
  const background = <HTMLElement>(
    createElement('div', 'games__wrapper-background')
  );

  return background;
};

const renderGamePage = () => {
  const wrapperMain = <HTMLElement>document.querySelector('.main__wrapper');
  const wrapper = <HTMLElement>createElement('div', 'games__wrapper');
  const game = renderGameBackground();

  const sprint = createGameSlot(game, 'СПРИНТ');
  sprint.addEventListener('click', () => {
    removeAllChildNodes(wrapperMain);
    createSprintMenu(wrapperMain);
  });
  createGameSlot(game, 'АУДИОВЫЗОВ');
  removeAllChildNodes(wrapperMain);

  wrapperMain.append(wrapper);
  wrapper.append(game);

  return wrapper;
};

const handleGameIconClick = () => {
  const gameBtn = <HTMLDivElement>document.querySelector('.bi-controller');
  gameBtn.addEventListener('click', async () => {
    renderGamePage();
  });
};

export { handleGameIconClick, renderGamePage };
