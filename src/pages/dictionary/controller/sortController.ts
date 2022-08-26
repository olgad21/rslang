const sortWords = () => {
  const dictionaryBtns = document.querySelectorAll('.sort-btn');
  dictionaryBtns?.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        dictionaryBtns?.forEach((item) => {
          item.classList.remove('active-element');
        });
        event.target.classList.add('active-element');
        if (event.target.innerText === 'Изучаемые слова') {
          // getUserWords();
        } else if (event.target.innerText === 'Cложные слова') {
          // getUserDifficultWords();
        } else {
          // getUserDeletedWords();
        }
      }
    });
  });
};
export default sortWords;
