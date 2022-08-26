import strings, { host, Word } from '../../../constants';
import createElement from '../../../helpers';

const renderWord = (word: Word) => {
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
  const complicatedBtn = createElement('button', ['complicated-btn', 'control-btn']) as HTMLButtonElement;
  complicatedBtn.setAttribute('data-id1', `${word.id}`);
  complicatedBtn.textContent = strings.complicated;
  if (localStorage.getItem('user_id')) {
    complicatedBtn.disabled = false;
  } else {
    complicatedBtn.disabled = true;
  }
  const learnedBtn = createElement('button', ['learned-btn', 'control-btn']) as HTMLButtonElement;
  learnedBtn.setAttribute('data-id2', `${word.id}`);
  learnedBtn.textContent = strings.learned;
  if (localStorage.getItem('user_id')) {
    learnedBtn.disabled = false;
  } else {
    learnedBtn.disabled = true;
  }
  const deletedBtn = createElement('button', ['deleted-btn', 'control-btn']) as HTMLButtonElement;
  deletedBtn.setAttribute('data-id3', `${word.id}`);
  deletedBtn.textContent = strings.deleted;
  if (localStorage.getItem('user_id')) {
    deletedBtn.disabled = false;
  } else {
    deletedBtn.disabled = true;
  }
  controlBtns.append(complicatedBtn, learnedBtn, deletedBtn);

  const hardWord = createElement('p', 'hard-word');
  hardWord.setAttribute('data-hard', `${word.id}`);
  hardWord.textContent = '';

  const infoContainer = createElement('div', 'info-container');
  infoContainer.append(hardWord, wordInfo, wordMeaning, wordExamples, controlBtns);

  const wordImg = createElement('div', 'word-img');
  const image = document.createElement('img');
  image.src = `${host}/${word.image}`;
  wordImg.appendChild(image);

  const wordContainer = createElement('div', 'word-container');
  wordContainer.setAttribute('id', `${word.id}`);
  wordContainer.append(wordImg, infoContainer);
  return wordContainer;
};

export default renderWord;
