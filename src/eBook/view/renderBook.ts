import { getWords } from '../controller/wordsController';
import { Word } from '../../constants';
import renderWord from './renderWord';
import './renderWord.scss';

const vocabulary = getWords();
// eslint-disable-next-line import/prefer-default-export
export const renderEBook = async () => {
  vocabulary.then((response) => {
    const eBook = document.createElement('div') as HTMLDivElement;
    eBook.setAttribute('class', '.e-book-container');
    const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
    const wordsContainer = document.createElement('div');
    wordsContainer.setAttribute('class', 'words-container');
    mainWrapper.appendChild(wordsContainer);

    const title = document.createElement('h2');
    title.setAttribute('class', 'title');
    title.textContent = 'Электронный учебник';
    wordsContainer.appendChild(title);

    const chapters = document.createElement('div');
    chapters.setAttribute('class', 'chapter-container');
    const levels = [1, 2, 3, 4, 5, 6];
    let count = 0;
    levels.map((level) => {
      const levelBtn = document.createElement('button');
      levelBtn.setAttribute('class', 'level-btn');
      levelBtn.setAttribute('data-id', `${count}`);
      levelBtn.innerText = `${level}`;
      count += 1;
      return chapters.appendChild(levelBtn);
    });
    wordsContainer.appendChild(chapters);

    response.map((word: Word) => {
      const wordItem = document.createElement('div');
      wordItem.setAttribute('class', 'word-item');
      wordsContainer.appendChild(wordItem);
      return wordItem.insertAdjacentHTML('beforeend', renderWord(word));
    });
  });
};
