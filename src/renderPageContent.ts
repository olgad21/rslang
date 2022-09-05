import {
  chooseLevel,
  choosePage,
} from './pages/eBook/controller/listenController';
import { renderEBookHeader, renderEBook } from './pages/eBook/view/renderBook';
import renderMainPage from './pages/main-page/main-page';
import renderStatisticsPage from './pages/statistics/statistics';
import renderGameMenu from './pages/games/index';

const renderPageContent = async () => {
  const currentPage = window.location.pathname;
  switch (currentPage) {
    case '/':
    case '/main-page':
      renderMainPage();
      break;
    case '/ebook':
      renderEBookHeader();
      chooseLevel();
      choosePage();
      renderEBook();
      break;
    case '/games':
      renderGameMenu();
      break;
    case '/statistics':
      renderStatisticsPage();
      break;
    default:
      renderMainPage();
  }
};

export default renderPageContent;
