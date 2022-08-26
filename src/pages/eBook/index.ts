import { chooseLevel, choosePage } from './controller/listenController';
import { renderEBook, renderEBookPage } from './view/renderBook';

const handleEbookIconClick = () => {
  const eBookBtn = document.querySelector('.bi-book') as HTMLDivElement;
  eBookBtn.addEventListener('click', async () => {
    renderEBookPage();
    chooseLevel();
    choosePage();
    renderEBook();
  });
};
export default handleEbookIconClick;
