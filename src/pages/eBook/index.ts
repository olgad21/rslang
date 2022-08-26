import { chooseLevel, choosePage } from './controller/listenController';
import { renderEBook, renderEBookHeader } from './view/renderBook';

const handleEbookIconClick = () => {
  const eBookBtn = document.querySelector('.bi-book') as HTMLDivElement;
  eBookBtn.addEventListener('click', async () => {
    renderEBookHeader();
    chooseLevel();
    choosePage();
    renderEBook();
  });
};
export default handleEbookIconClick;
