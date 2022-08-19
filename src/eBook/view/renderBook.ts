import { getWords } from '../controller/wordsController';
import { Word } from '../../constants';
import renderWord from './renderWord';
import './renderWord.scss';
import renderPagination from './pagination';

const vocabulary = getWords();
const renderEBook = () => {
  vocabulary.then((response) => {
    const eBook = document.createElement('div');
    eBook.classList.add('.e-book-container');
    const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('words-container');
    mainWrapper.appendChild(wordsContainer);

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = 'Электронный учебник';
    wordsContainer.appendChild(title);

    const chapters = document.createElement('div');
    chapters.classList.add('chapter-container');
    const levels = [1, 2, 3, 4, 5, 6];
    let count = 0;
    levels.map((level) => {
      const levelBtn = document.createElement('button');
      levelBtn.classList.add('level-btn');
      levelBtn.setAttribute('data-id', `${count}`);
      levelBtn.innerText = `${level}`;
      count += 1;
      return chapters.appendChild(levelBtn);
    });
    wordsContainer.appendChild(chapters);

    const paginationElem = renderPagination();
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    pagination.appendChild(paginationElem);
    wordsContainer.appendChild(pagination);

    response.map((word: Word) => {
      const wordItem = document.createElement('div');
      wordItem.classList.add('word-item');
      wordsContainer.appendChild(wordItem);
      wordItem.append(renderWord(word));
      return wordItem;
    });
  });
};

export default renderEBook;
