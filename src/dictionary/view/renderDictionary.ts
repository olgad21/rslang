import createElement from '../../helpers';

const renderDictionary = () => {
  const learnedWords = createElement('button', ['learned-words', 'sort-btn']);
  learnedWords.textContent = 'Изучаемые слова';
  learnedWords.style.width = '33.3%';
  const difficultWords = createElement('button', ['difficult-words', 'sort-btn']);
  difficultWords.textContent = 'Cложные слова';
  difficultWords.style.width = '33.3%';
  const deletedWords = createElement('button', ['deleted-words', 'sort-btn']);
  deletedWords.textContent = 'Удаленные слова';
  deletedWords.style.width = '33.3%';

  const dictionaryBtns = createElement('div', ['dictionary-btns', 'btn-group']);
  dictionaryBtns.style.width = '100%';
  dictionaryBtns.append(learnedWords, difficultWords, deletedWords);

  const wordsContainer = document.querySelector('.words-container') as HTMLDivElement;
  wordsContainer.appendChild(dictionaryBtns);
};

export default renderDictionary;
