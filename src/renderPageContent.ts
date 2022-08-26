import { chooseLevel, choosePage } from './pages/eBook/controller/listenController';
import { renderEBookPage, renderEBook } from './pages/eBook/view/renderBook';
import renderMainPage from './pages/main-page/main-page';

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
    case 'dictionary':
      break;
    case 'games':
      break;
    case 'statistics':
      break;
    default:
      renderMainPage();
  }
};

export default renderPageContent;