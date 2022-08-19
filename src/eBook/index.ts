import { renderEBook } from './view/renderBook';

const listen = () => {
  const eBookBtn = document.querySelector('.bi-book') as HTMLDivElement;
  eBookBtn.addEventListener('click', async () => {
    const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
    mainWrapper.innerHTML = '';
    await renderEBook();
  });
};
export default listen;
