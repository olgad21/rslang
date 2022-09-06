import { getUserWord, updateUserWord } from '../../../API/userWordAPI';
import strings, { Hard, wordBase } from '../../../constants';
// eslint-disable-next-line import/no-cycle
import renderHardLevel from '../view/renderHardLevel';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const removeFromHard = () => {
  const controlBtns = document.querySelectorAll('.control-btn');
  controlBtns?.forEach((btn) => {
    btn?.addEventListener('click', async (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.innerText === strings.easy) {
          const wordId = event.target.dataset.id1;
          const userWord = await getUserWord({ userId, wordId, token });
          userWord.json().then((data) => {
            wordBase.difficulty = Hard.easy;
            wordBase.optional.attemp = data.optional.attemp;
            wordBase.optional.isNewWord = data.optional.isNewWord;
            wordBase.optional.sprintNew = data.optional.sprintNew;
            wordBase.optional.audioNew = data.optional.audioNew;
            wordBase.optional.guesses = data.optional.guesses;
            wordBase.optional.error = data.optional.error;
            wordBase.optional.isLearned = false;
            wordBase.optional.sprintLearned = data.optional.sprintLearned;
            wordBase.optional.audioLearned = data.optional.audioLearned;
            wordBase.optional.date = data.optional.date;
            wordBase.optional.dateSprintLearned = data.optional.dateSprintLearn;
            wordBase.optional.dateAudioLearned = data.optional.dateAudioLearned;
            wordBase.optional.dateSprintNew = data.optional.dateSprintLearned;
            wordBase.optional.dateAudioNew = data.optional.dateAudioLearned;
            wordBase.optional.dateLearned = data.optional.dateLearned;
            updateUserWord({
              userId,
              wordId,
              token,
              wordBase,
            });
          });
          renderHardLevel();
        }
      }
    });
  });
};

export default removeFromHard;
