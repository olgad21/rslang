import { updateUserWord } from '../../../API/userWordAPI';
import strings, { wordBase } from '../../../constants';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const removeFromHard = () => {
  const controlBtns = document.querySelectorAll('.control-btn');
  controlBtns?.forEach((btn) => {
    btn?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.innerText === strings.easy) {
          const wordId = event.target.dataset.id1;
          wordBase.difficulty = 'easy';
          updateUserWord({
            userId, wordId, token, wordBase,
          });
        }
      }
    });
  });
};

export default removeFromHard;
