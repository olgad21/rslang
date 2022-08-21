/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line import/no-cycle
import { renderEBook } from '../view/renderBook';
import { PAGES_NUMBER } from '../../constants';
import { userPosition } from '../../helpers';

const storage = userPosition();

function moveRight() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector('.current-btn') as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (currentBtn?.innerHTML === '1') {
    startBtn.disabled = false;
    startBtn.classList.add('active-element');
    prevBtn.disabled = false;
    prevBtn.classList.add('active-element');
  }
  storage.page += 1;
  currentBtn.innerHTML = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  if (storage.page === PAGES_NUMBER) {
    nextBtn.disabled = true;
    nextBtn.classList.remove('active-element');
    endBtn.disabled = true;
    endBtn.classList.remove('active-element');
  }
  renderEBook();
}

function moveLeft() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector('.current-btn') as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (currentBtn.innerHTML === '2') {
    startBtn.disabled = true;
    startBtn.classList.remove('active-element');
    prevBtn.disabled = true;
    prevBtn.classList.remove('active-element');
  }
  storage.page -= 1;
  currentBtn.innerHTML = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  if (storage.page === PAGES_NUMBER - 1) {
    nextBtn.disabled = false;
    nextBtn.classList.add('active-element');
    endBtn.disabled = false;
    endBtn.classList.add('active-element');
  }
  renderEBook();
}

function moveRightMax() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector('.current-btn') as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (currentBtn.innerHTML === '1') {
    startBtn.disabled = false;
    startBtn.classList.add('active-element');
    prevBtn.disabled = false;
    prevBtn.classList.add('active-element');
  }
  storage.page = PAGES_NUMBER;
  currentBtn.innerHTML = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  nextBtn.disabled = true;
  nextBtn.classList.remove('active-element');
  endBtn.disabled = true;
  endBtn.classList.remove('active-element');
  renderEBook();
}

function moveLeftMax() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector('.current-btn') as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (storage.page === PAGES_NUMBER) {
    startBtn.classList.remove('active-element');
    prevBtn.disabled = true;
    prevBtn.classList.remove('active-element');
  }
  storage.page = 1;
  currentBtn.innerHTML = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  nextBtn.disabled = false;
  nextBtn.classList.add('active-element');
  endBtn.disabled = false;
  endBtn.classList.add('active-element');
  renderEBook();
}

export const chooseLevel = () => {
  const levelBtns = document.querySelectorAll('.level-btn');
  levelBtns?.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        levelBtns?.forEach((item) => {
          item.classList.remove('active-element');
        });
        event.target.classList.add('active-element');
        storage.group = +event.target.innerText;
        storage.page = 1;
        localStorage.setItem('userLevel', JSON.stringify(storage));
        const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
        const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
        const currentBtn = document.querySelector('.current-btn') as HTMLButtonElement;
        const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
        const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
        currentBtn.innerText = '1';
        startBtn.disabled = true;
        startBtn.classList.remove('active-element');
        prevBtn.disabled = true;
        prevBtn.classList.remove('active-element');
        nextBtn.disabled = false;
        nextBtn.classList.add('active-element');
        endBtn.disabled = false;
        endBtn.classList.add('active-element');
        renderEBook();
      }
    });
  });
};

export const choosePage = () => {
  const pagesList = document.querySelectorAll('.page-btn');
  pagesList?.forEach((page) => {
    page.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.classList.contains('start-btn')) {
          moveLeftMax();
        } else if (event.target.classList.contains('prev-btn')) {
          moveLeft();
        } else if (event.target.classList.contains('next-btn')) {
          moveRight();
        } else if (event.target.classList.contains('end-btn')) {
          moveRightMax();
        }
      }
    });
  });
};
