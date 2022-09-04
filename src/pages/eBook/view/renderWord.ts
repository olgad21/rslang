import strings, { host } from '../../../constants';
import createElement from '../../../helpers';
import { ExtendWord, Word } from '../../../Interfaces';

const renderWord = (word: Word | ExtendWord) => {
  const dataId = word.id ? word.id : word._id;
  const english = createElement('p', 'english');
  english.textContent = `${word.word}`;
  const transcription = createElement('p', 'transcription');
  transcription.textContent = `${word.transcription}`;
  const translation = createElement('p', 'translation');
  translation.textContent = `${word.wordTranslate}`;

  const wordBox = createElement('div', 'word-box');
  wordBox.append(english, transcription, translation);

  const sound = createElement('button', 'sound-image');
  sound.setAttribute('data-audio', `${host}/${word.audio}`);
  sound.setAttribute('data-audioMeaning', `${host}/${word.audioMeaning}`);
  sound.setAttribute('data-audioExample', `${host}/${word.audioExample}`);

  const wordInfo = createElement('div', 'word-info');
  wordInfo.append(wordBox, sound);

  const textMeaning = createElement('div', 'text-meaning');
  textMeaning.innerHTML = `${word.textMeaning}`;
  const textMeaningTranslate = createElement('div', 'text-meaning-translate');
  textMeaningTranslate.textContent = `${word.textMeaningTranslate}`;
  const wordMeaning = createElement('div', 'word-meaning');
  wordMeaning.append(textMeaning, textMeaningTranslate);

  const textExamples = createElement('div', 'text-examples');
  textExamples.innerHTML = `${word.textExample}`;
  const textMeaningExamples = createElement('div', 'text-meaning-translate');
  textMeaningExamples.textContent = `${word.textExampleTranslate}`;
  const wordExamples = createElement('div', 'word-examples');
  wordExamples.append(textExamples, textMeaningExamples);

  const controlBtns = createElement('div', 'control-btns');

  const complicatedBtn = createElement('button', [
    'complicated-btn',
    'control-btn',
  ]) as HTMLButtonElement;
  complicatedBtn.setAttribute('data-id1', `${dataId}`);
  complicatedBtn.setAttribute('data-id1', `${dataId}`);
  complicatedBtn.textContent = strings.complicated;
  if (localStorage.getItem('user_id')) {
    complicatedBtn.disabled = false;
  } else {
    complicatedBtn.disabled = true;
  }
  const learnedBtn = createElement('button', [
    'learned-btn',
    'control-btn',
  ]) as HTMLButtonElement;
  learnedBtn.setAttribute('data-id2', `${dataId}`);
  learnedBtn.textContent = strings.learned;
  if (localStorage.getItem('user_id')) {
    learnedBtn.disabled = false;
  } else {
    learnedBtn.disabled = true;
  }
  controlBtns.append(complicatedBtn, learnedBtn);

  const guesses = createElement('p', 'guess-text');
  guesses.textContent = strings.guesses;
  const countGuesses = createElement('span', 'guess-count');
  countGuesses.setAttribute('data-guess', `${dataId}`);
  countGuesses.textContent = '0';

  const error = createElement('p', 'error-text');
  error.textContent = strings.error;
  const countError = createElement('span', 'error-count');
  countError.setAttribute('data-error', `${dataId}`);
  countError.textContent = '0';

  const progress = createElement('div', 'progress-block');
  progress.append(guesses, countGuesses, error, countError);

  const statistic = createElement('div', 'statistic');
  statistic.append(progress, controlBtns);

  const hardWord = createElement('p', 'hard-word');

  hardWord.setAttribute('data-hard', `${dataId}`);
  hardWord.textContent = '';

  const infoContainer = createElement('div', 'info-container');
  infoContainer.append(
    hardWord,
    wordInfo,
    wordMeaning,
    wordExamples,
    statistic
  );

  const wordImg = createElement('div', 'word-img');
  const image = document.createElement('img');
  image.src = `${host}/${word.image}`;
  wordImg.appendChild(image);

  const wordContainer = createElement('div', 'word-container');
  wordContainer.setAttribute('id', `${dataId}`);
  wordContainer.append(wordImg, infoContainer);
  return wordContainer;
};

export default renderWord;
