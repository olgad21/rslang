import renderHeader from '../components/header';
import renderSidebar from '../components/sidebar';
import renderFooter from '../components/footer';
import createElement from '../helpers';
import createGameSlot from './game-slot/game-slot';
import './game-menu.scss';

const renderGameBackground = () => {
  const background = <HTMLElement>(
    createElement('div', 'games__wrapper-background')
  );

  return background;
};

const renderGamePage = () => {
  const wrapper = <HTMLElement>createElement('div', 'games__wrapper');
  document.body.append(wrapper);

  const header = renderHeader();
  const sidebar = renderSidebar();
  const footer = renderFooter();
  const game = renderGameBackground();

  createGameSlot(game, 'СПРИНТ');
  createGameSlot(game, 'АУДИОВЫЗОВ');
  wrapper.append(header, sidebar, game, footer);

  return wrapper;
};

export default renderGamePage;
