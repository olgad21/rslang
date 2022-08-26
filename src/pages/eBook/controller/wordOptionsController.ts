import {
  createUserWord, deleteUserWord, getUserWord, updateUserWord,
} from '../../../API/userWordAPI';
import strings from '../../../constants';
import { UserWordOptions } from '../../../Interfaces';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));
const word : UserWordOptions = {
  difficulty: 'easy',
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
    btn.addEventListener('click', async (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.innerText === strings.complicated) {
          const wordId = event.target.dataset.id1;
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = String(strings.complicated);
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = 'Простое';
          complicatedBtn.classList.add('easy-word');
          word.difficulty = 'hard';
          const userWord = await getUserWord({ userId, wordId, token });
          if (userWord.status === 404) {
            createUserWord({
              userId, wordId, token, word,
            });
          } else {
            updateUserWord({
              userId, wordId, token, word,
            });
          }
        } else if (event.target.innerText === 'Простое') {
          const wordId = event.target.dataset.id1;
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = strings.complicated;
          complicatedBtn.classList.remove('easy-word');
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = '';
          word.difficulty = 'easy';
          updateUserWord({
            userId, wordId, token, word,
          });
        } else if (event.target.innerText === strings.learned) {
          const wordId = event.target.dataset.id2;
          const learnedBtn = <HTMLElement>document.querySelector(`[data-id2="${wordId}"]`);
          learnedBtn.style.backgroundColor = 'grey';
          word.optional.isLearned = true;
          updateUserWord({
            userId, wordId, token, word,
          });
        } else if (event.target.innerText === strings.deleted) {
          const wordId = event.target.dataset.id3;
          const deletedBtn = <HTMLElement>document.querySelector(`[data-id3="${wordId}"]`);
          deletedBtn.style.backgroundColor = 'grey';
          deleteUserWord({ userId, wordId, token });
        }
      }
    });
  });
};

export default wordOptions;
