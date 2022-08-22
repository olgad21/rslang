import { host, Word } from '../../constants';
import createElement from '../../helpers';

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

  const infoContainer = createElement('div', 'info-container');
  infoContainer.append(wordInfo, wordMeaning, wordExamples);

  const wordImg = createElement('div', 'word-img');
  const image = document.createElement('img');
  image.src = `${host}/${word.image}`;
  wordImg.appendChild(image);

  const wordContainer = createElement('div', 'word-container');
  wordContainer.append(wordImg, infoContainer);
  return wordContainer;
};

export default renderWord;
