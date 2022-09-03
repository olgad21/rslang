import { createElement } from '../../../../helpers';
import createGameSlot from '../game-slot/game-slot';
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

  return [wrapper, game, wrapperMain, sprint];
};

export default renderGamePage;
