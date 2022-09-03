import { updateUserWord } from '../../../API/userWordAPI';
import strings, { Hard, wordBase } from '../../../constants';
// eslint-disable-next-line import/no-cycle
import renderHardLevel from '../view/renderHardLevel';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const removeFromHard = () => {
  const controlBtns = document.querySelectorAll('.control-btn');
  controlBtns?.forEach((btn) => {
    btn?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.innerText === strings.easy) {
          const wordId = event.target.dataset.id1;
          wordBase.difficulty = Hard.easy;
          updateUserWord({
            userId, wordId, token, wordBase,
          });
          renderHardLevel();
        }
      }
    });
  });
};

export default removeFromHard;
