import strings from '../../../constants';
import createElement from '../../../helpers';
import './dictionary.scss';

const renderDictionary = () => {
  const learnedWords = createElement('button', ['learned-words', 'sort-btn']);
  learnedWords.textContent = strings.learnedWords;
  learnedWords.style.width = strings.width;
  const difficultWords = createElement('button', ['difficult-words', 'sort-btn']);
  difficultWords.textContent = strings.complicatedWords;
  difficultWords.style.width = strings.width;
  const deletedWords = createElement('button', ['deleted-words', 'sort-btn']);
  deletedWords.textContent = strings.deletedWords;
  deletedWords.style.width = strings.width;

  const dictionaryBtns = createElement('div', ['dictionary-btns', 'btn-group']);
  dictionaryBtns.style.width = '100%';
  dictionaryBtns.append(learnedWords, difficultWords, deletedWords);

  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
  wordsContainer.appendChild(dictionaryBtns);
};

export default renderDictionary;
