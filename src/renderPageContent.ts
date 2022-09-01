import {
  chooseLevel,
  choosePage,
} from './pages/eBook/controller/listenController';
import { renderEBookPage, renderEBook } from './pages/eBook/view/renderBook';
import renderMainPage from './pages/main-page/main-page';
import renderStatisticsPage from './pages/statistics/statistics';
import { renderGamePage } from './pages/games/game-components/game-menu/game-menu';

const renderPageContent = () => {
  const currentPage = window.location.pathname;
  switch (currentPage) {
    case '/':
    case '/main-page':
      renderMainPage();
      break;
    case '/ebook':
      renderEBookPage();
      chooseLevel();
      choosePage();
      renderEBook();
      break;
    case '/dictionary':
      break;
    case '/games':
      renderGamePage();
      break;
    case '/statistics':
      renderStatisticsPage();
      break;
    default:
      renderMainPage();
  }
};

export default renderPageContent;
