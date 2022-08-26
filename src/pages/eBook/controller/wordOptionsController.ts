import { createUserWord, getUserWord, updateUserWord } from '../../../API/userWordAPI';
import strings from '../../../constants';
import { UserWordOptions } from '../../../Interfaces';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));
const word : UserWordOptions = {
  difficulty: 'hard',
  optional: {
    attemp: 0,
    isNewWord: false,
    guesses: 0,
    error: 0,
    isLearned: false,
  },
};

const wordOptions = () => {
  const controlBtns = document.querySelectorAll('.control-btn');
  controlBtns?.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        // eslint-disable-next-line no-console
        console.log(event.target);
        const wordId = event.target.dataset.id1;
        if (event.target.innerText === strings.complicated) {
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = String(strings.complicated);
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = 'Простое';
          complicatedBtn.classList.add('easy-word');
          const userWord = getUserWord({ userId, wordId, token });
          if (!userWord) {
            createUserWord({
              userId, wordId, token, word,
            });
          } else {
            updateUserWord({
              userId, wordId, token, word,
            });
          }
        } else if (event.target.innerText === 'Простое') {
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = strings.complicated;
          complicatedBtn.classList.remove('easy-word');
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = '';
        } else if (event.target.innerText === strings.learned) {
          const learnedBtn = <HTMLElement>document.querySelector(`[data-id2="${wordId}"]`);
          learnedBtn.style.backgroundColor = 'grey';
        }
      }
    });
  });
};

export default wordOptions;
