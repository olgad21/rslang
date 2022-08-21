import { renderEBook, renderEBookPage } from './view/renderBook';

const listen = () => {
  const eBookBtn = document.querySelector('.bi-book') as HTMLDivElement;
  eBookBtn.addEventListener('click', async () => {
    renderEBookPage();
    renderEBook();
  });
};
export default listen;
