import { renderEBook } from '../view/renderBook';
import strings, { PAGES_NUMBER } from '../../../constants';
import { removeAllChildNodes, userPosition } from '../../../helpers';
import renderHardLevel from '../view/renderHardLevel';
import { renderSprint } from '../../games';

const storage = userPosition();

function moveRight() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector(
    '.current-btn',
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (currentBtn?.innerHTML === '1') {
    startBtn.disabled = false;
    startBtn.classList.add('active-element');
    prevBtn.disabled = false;
    prevBtn.classList.add('active-element');
  }
  storage.page += 1;
  currentBtn.textContent = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  if (storage.page === PAGES_NUMBER) {
    nextBtn.disabled = true;
    nextBtn.classList.remove('active-element');
    endBtn.disabled = true;
    endBtn.classList.remove('active-element');
  }
}

function moveLeft() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector(
    '.current-btn',
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (currentBtn.innerHTML === '2') {
    startBtn.disabled = true;
    startBtn.classList.remove('active-element');
    prevBtn.disabled = true;
    prevBtn.classList.remove('active-element');
  }
  storage.page -= 1;
  currentBtn.textContent = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  if (storage.page === PAGES_NUMBER - 1) {
    nextBtn.disabled = false;
    nextBtn.classList.add('active-element');
    endBtn.disabled = false;
    endBtn.classList.add('active-element');
  }
}

function moveRightMax() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector(
    '.current-btn',
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (currentBtn.innerHTML === '1') {
    startBtn.disabled = false;
    startBtn.classList.add('active-element');
    prevBtn.disabled = false;
    prevBtn.classList.add('active-element');
  }
  storage.page = PAGES_NUMBER;
  currentBtn.textContent = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  nextBtn.disabled = true;
  nextBtn.classList.remove('active-element');
  endBtn.disabled = true;
  endBtn.classList.remove('active-element');
}

function moveLeftMax() {
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const currentBtn = document.querySelector(
    '.current-btn',
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
  if (storage.page === PAGES_NUMBER) {
    startBtn.classList.remove('active-element');
    prevBtn.disabled = true;
    prevBtn.classList.remove('active-element');
  }
  storage.page = 1;
  currentBtn.textContent = storage.page.toString();
  localStorage.setItem('userLevel', JSON.stringify(storage));
  nextBtn.disabled = false;
  nextBtn.classList.add('active-element');
  endBtn.disabled = false;
  endBtn.classList.add('active-element');
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
        storage.group = Number(event.target.getAttribute('data-id'));
        storage.page = 1;
        localStorage.setItem('userLevel', JSON.stringify(storage));
        const startBtn = document.querySelector(
          '.start-btn',
        ) as HTMLButtonElement;
        const prevBtn = document.querySelector(
          '.prev-btn',
        ) as HTMLButtonElement;
        const currentBtn = document.querySelector(
          '.current-btn',
        ) as HTMLButtonElement;
        const nextBtn = document.querySelector(
          '.next-btn',
        ) as HTMLButtonElement;
        const endBtn = document.querySelector('.end-btn') as HTMLButtonElement;
        currentBtn.textContent = '1';
        startBtn.disabled = true;
        startBtn.classList.remove('active-element');
        prevBtn.disabled = true;
        prevBtn.classList.remove('active-element');
        nextBtn.disabled = false;
        nextBtn.classList.add('active-element');
        endBtn.disabled = false;
        endBtn.classList.add('active-element');
        if (storage.group === 7) {
          const pagination = document.querySelector(
            '.pagination',
          ) as HTMLDivElement;
          pagination.style.display = 'none';
          const wordsContainer = document.querySelector(
            '.words-container',
          ) as HTMLDivElement;
          wordsContainer.style.backgroundColor = 'white';
          removeAllChildNodes(wordsContainer);
          if (localStorage.getItem('user_id')) {
            renderHardLevel();
          } else {
            wordsContainer.textContent = strings.needLogin;
            wordsContainer.classList.add('center');
          }
        } else {
          const pagination = document.querySelector(
            '.pagination',
          ) as HTMLDivElement;
          pagination.style.display = 'flex';
          renderEBook();
        }
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
          renderEBook();
        } else if (event.target.classList.contains('prev-btn')) {
          moveLeft();
          renderEBook();
        } else if (event.target.classList.contains('next-btn')) {
          moveRight();
          renderEBook();
        } else if (event.target.classList.contains('end-btn')) {
          moveRightMax();
          renderEBook();
        }
      }
    });
  });
};

export const linkToGame = () => {
  const sprintLink = document.querySelector('.savana');
  sprintLink?.addEventListener('click', () => {
    const userLevel = userPosition();
    renderSprint(userLevel.group - 1, userLevel.page - 1);
  });

  const audioLink = document.querySelector('.audio-call');
  audioLink?.addEventListener('click', () => {
    // const userLevel = userPosition();
    // renderSprint(userLevel.group, userLevel.page);
    // должна быть функция которая запускает вторую игру
  });
};
