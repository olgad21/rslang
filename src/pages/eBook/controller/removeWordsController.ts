import { updateUserWord } from '../../../API/userWordAPI';
import strings, { wordBase } from '../../../constants';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const removeFromHard = () => {
  const controlBtns = document.querySelectorAll('.control-btn');
  controlBtns?.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.innerText === strings.complicated) {
          const wordId = event.target.dataset.id1;
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = String(strings.complicated);
          const learnedBtn = <HTMLElement>document.querySelector(`[data-id2="${wordId}"]`);
          learnedBtn.style.backgroundColor = 'green';
          learnedBtn.textContent = strings.learned;
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = strings.easy;
          complicatedBtn.classList.add('easy-word');
          wordBase.difficulty = 'hard';
          wordBase.optional.isLearned = false;
          updateUserWord({
            userId, wordId, token, wordBase,
          });
        } else if (event.target.innerText === strings.easy) {
          const wordId = event.target.dataset.id1;
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = strings.complicated;
          complicatedBtn.classList.remove('easy-word');
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = '';
          wordBase.difficulty = 'easy';
          updateUserWord({
            userId, wordId, token, wordBase,
          });
        } else if (event.target.innerText === strings.learned) {
          const wordId = event.target.dataset.id2;
          const learnedBtn = <HTMLElement>document.querySelector(`[data-id2="${wordId}"]`);
          learnedBtn.style.backgroundColor = 'grey';
          learnedBtn.textContent = strings.learnedWords;
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = strings.learned;
          wordBase.optional.isLearned = true;
          wordBase.difficulty = 'easy';
          const complicatedBtn = <HTMLButtonElement>document.querySelector(`[data-id1="${wordId}"]`);
          complicatedBtn.textContent = strings.complicated;
          complicatedBtn.classList.remove('easy-word');
          updateUserWord({
            userId, wordId, token, wordBase,
          });
        } else if (event.target.innerText === strings.learnedWords) {
          const wordId = event.target.dataset.id2;
          const learnedBtn = <HTMLElement>document.querySelector(`[data-id2="${wordId}"]`);
          learnedBtn.style.backgroundColor = 'green';
          learnedBtn.textContent = strings.learned;
          const hardWord = <HTMLElement>document.querySelector(`[data-hard="${wordId}"]`);
          hardWord.textContent = '';
          wordBase.optional.isLearned = false;
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
