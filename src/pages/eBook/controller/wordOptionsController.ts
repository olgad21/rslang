import {
  createUserWord,
  getUserWord,
  updateUserWord,
} from '../../../API/userWordAPI';
import strings, { Hard, wordBase } from '../../../constants';

const userId = String(localStorage.getItem('user_id'));
const token = String(localStorage.getItem('token'));

const wordOptions = () => {
  const controlBtns = document.querySelectorAll('.control-btn');
  controlBtns?.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.innerText === strings.complicated) {
          const wordId = event.target.dataset.id1;
          const hardWord = <HTMLElement>(
            document.querySelector(`[data-hard="${wordId}"]`)
          );
          hardWord.textContent = String(strings.complicated);
          const learnedBtn = <HTMLElement>(
            document.querySelector(`[data-id2="${wordId}"]`)
          );
          learnedBtn.style.backgroundColor = 'green';
          learnedBtn.textContent = strings.learned;
          const complicatedBtn = <HTMLButtonElement>(
            document.querySelector(`[data-id1="${wordId}"]`)
          );
          complicatedBtn.textContent = strings.easy;
          complicatedBtn.classList.add('easy-word');
          wordBase.difficulty = Hard.hard;
          wordBase.optional.isLearned = false;
          const userWord = await getUserWord({ userId, wordId, token });
          if (userWord.status === 404) {
            createUserWord({
              userId,
              wordId,
              token,
              wordBase,
            });
          } else {
            userWord.json().then((data) => {
              wordBase.optional.attemp = data.optional.attemp;
              wordBase.optional.isNewWord = data.optional.isNewWord;
              wordBase.optional.sprintNew = data.optional.sprintNew;
              wordBase.optional.audioNew = data.optional.audioNew;
              wordBase.optional.guesses = data.optional.guesses;
              wordBase.optional.error = data.optional.error;
              wordBase.optional.isLearned = data.optional.isLearned;
              wordBase.optional.sprintLearned = data.optional.sprintLearned;
              wordBase.optional.audioLearned = data.optional.audioLearned;
              wordBase.optional.date = data.optional.date;
              wordBase.optional.dateSprintLearned =
                data.optional.dateSprintLearn;
              wordBase.optional.dateAudioLearned =
                data.optional.dateAudioLearned;
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
          }
        } else if (event.target.innerText === strings.easy) {
          const wordId = event.target.dataset.id1;
          const complicatedBtn = <HTMLButtonElement>(
            document.querySelector(`[data-id1="${wordId}"]`)
          );
          complicatedBtn.textContent = strings.complicated;
          complicatedBtn.classList.remove('easy-word');
          const hardWord = <HTMLElement>(
            document.querySelector(`[data-hard="${wordId}"]`)
          );
          hardWord.textContent = '';

          const userWord = await getUserWord({ userId, wordId, token });
          userWord.json().then((data) => {
            wordBase.difficulty = Hard.easy;
            wordBase.optional.attemp = data.optional.attemp;
            wordBase.optional.isNewWord = data.optional.isNewWord;
            wordBase.optional.sprintNew = data.optional.sprintNew;
            wordBase.optional.audioNew = data.optional.audioNew;
            wordBase.optional.guesses = data.optional.guesses;
            wordBase.optional.error = data.optional.error;
            wordBase.optional.isLearned = data.optional.isLearned;
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
        } else if (event.target.innerText === strings.learned) {
          const wordId = event.target.dataset.id2;
          const learnedBtn = <HTMLElement>(
            document.querySelector(`[data-id2="${wordId}"]`)
          );
          learnedBtn.style.backgroundColor = 'grey';
          learnedBtn.textContent = strings.learnedWords;
          const hardWord = <HTMLElement>(
            document.querySelector(`[data-hard="${wordId}"]`)
          );
          hardWord.textContent = strings.learned;
          wordBase.optional.isLearned = true;
          wordBase.difficulty = Hard.easy;
          const complicatedBtn = <HTMLButtonElement>(
            document.querySelector(`[data-id1="${wordId}"]`)
          );
          complicatedBtn.textContent = strings.complicated;
          complicatedBtn.classList.remove('easy-word');
          const userWord = await getUserWord({ userId, wordId, token });
          if (userWord.status === 404) {
            createUserWord({
              userId,
              wordId,
              token,
              wordBase,
            });
          } else {
            userWord.json().then((data) => {
              wordBase.optional.attemp = data.optional.attemp;
              wordBase.optional.isNewWord = data.optional.isNewWord;
              wordBase.optional.sprintNew = data.optional.sprintNew;
              wordBase.optional.audioNew = data.optional.audioNew;
              wordBase.optional.guesses = data.optional.guesses;
              wordBase.optional.error = data.optional.error;
              wordBase.optional.sprintLearned = data.optional.sprintLearned;
              wordBase.optional.audioLearned = data.optional.audioLearned;
              wordBase.optional.date = data.optional.date;
              wordBase.optional.dateSprintLearned =
                data.optional.dateSprintLearn;
              wordBase.optional.dateAudioLearned =
                data.optional.dateAudioLearned;
              wordBase.optional.dateSprintNew = data.optional.dateSprintLearned;
              wordBase.optional.dateAudioNew = data.optional.dateAudioLearned;
              wordBase.optional.dateLearned = String(Date.now());
              updateUserWord({
                userId,
                wordId,
                token,
                wordBase,
              });
            });
          }
        } else if (event.target.innerText === strings.learnedWords) {
          const wordId = event.target.dataset.id2;
          const learnedBtn = <HTMLElement>(
            document.querySelector(`[data-id2="${wordId}"]`)
          );
          learnedBtn.style.backgroundColor = 'green';
          learnedBtn.textContent = strings.learned;
          const hardWord = <HTMLElement>(
            document.querySelector(`[data-hard="${wordId}"]`)
          );
          hardWord.textContent = '';
          wordBase.optional.isLearned = false;

          const userWord = await getUserWord({ userId, wordId, token });
          userWord.json().then((data) => {
            wordBase.difficulty = Hard.hard;
            wordBase.optional.attemp = data.optional.attemp;
            wordBase.optional.isNewWord = data.optional.isNewWord;
            wordBase.optional.sprintNew = data.optional.sprintNew;
            wordBase.optional.audioNew = data.optional.audioNew;
            wordBase.optional.guesses = data.optional.guesses;
            wordBase.optional.error = data.optional.error;
            wordBase.optional.sprintLearned = data.optional.sprintLearned;
            wordBase.optional.audioLearned = data.optional.audioLearned;
            wordBase.optional.date = data.optional.date;
            wordBase.optional.dateSprintLearned = data.optional.dateSprintLearn;
            wordBase.optional.dateAudioLearned = data.optional.dateAudioLearned;
            wordBase.optional.dateSprintNew = data.optional.dateSprintLearned;
            wordBase.optional.dateAudioNew = data.optional.dateAudioLearned;
            wordBase.optional.dateLearned = data.optional.date;
            updateUserWord({
              userId,
              wordId,
              token,
              wordBase,
            });
          });
        }
      }
    });
  });
};

export default wordOptions;
