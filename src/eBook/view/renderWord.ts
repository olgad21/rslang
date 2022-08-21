import { API_URL, Word } from '../../constants';

const renderWord = (word: Word) => {
  const english = document.createElement('p');
  english.classList.add('english');
  english.textContent = `${word.word}`;
  const transcription = document.createElement('p');
  transcription.classList.add('transcription');
  transcription.textContent = `${word.transcription}`;
  const translation = document.createElement('p');
  translation.classList.add('translation');
  translation.textContent = `${word.wordTranslate}`;

  const wordBox = document.createElement('div');
  wordBox.classList.add('word-box');
  wordBox.append(english, transcription, translation);

  const sound = document.createElement('button');
  sound.classList.add('sound-image');
  sound.setAttribute('data-audio', `${API_URL}/${word.audio}`);
  sound.setAttribute('data-audioMeaning', `${API_URL}/${word.audioMeaning}`);
  sound.setAttribute('data-audioExample', `${API_URL}/${word.audioExample}`);
  // const audio1 = document.createElement('audio');
  // audio1.id = 'audio-player';
  // audio1.controls = false;
  // audio1.src = `${API_URL}/${word.audio}`;
  // const audio2 = document.createElement('audio');
  // audio1.id = 'audio-player';
  // audio1.controls = false;
  // audio1.src = `${API_URL}/${word.audioMeaning}`;
  // const audio3 = document.createElement('audio');
  // audio1.id = 'audio-player';
  // audio1.controls = false;
  // audio1.src = `${API_URL}/${word.audioExample}`;
  // sound.append(audio1, audio2, audio3);

  const wordInfo = document.createElement('div');
  wordInfo.classList.add('word-info');
  wordInfo.append(wordBox, sound);

  const textMeaning = document.createElement('div');
  textMeaning.classList.add('text-meaning');
  textMeaning.innerHTML = `${word.textMeaning}`;
  const textMeaningTranslate = document.createElement('div');
  textMeaningTranslate.classList.add('text-meaning-translate');
  textMeaningTranslate.innerText = `${word.textMeaningTranslate}`;
  const wordMeaning = document.createElement('div');
  wordMeaning.classList.add('word-meaning');
  wordMeaning.append(textMeaning, textMeaningTranslate);

  const textExamples = document.createElement('div');
  textExamples.classList.add('text-examples');
  textExamples.innerHTML = `${word.textExample}`;
  const textMeaningExamples = document.createElement('div');
  textMeaningExamples.classList.add('text-meaning-translate');
  textMeaningExamples.innerText = `${word.textExampleTranslate}`;
  const wordExamples = document.createElement('div');
  wordExamples.classList.add('word-examples');
  wordExamples.append(textExamples, textMeaningExamples);

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');
  infoContainer.append(wordInfo, wordMeaning, wordExamples);

  const wordImg = document.createElement('div');
  wordImg.classList.add('word-img');
  const image = document.createElement('img');
  image.src = `${API_URL}/${word.image}`;
  wordImg.appendChild(image);

  const wordContainer = document.createElement('div');
  wordContainer.classList.add('word-container');
  wordContainer.append(wordImg, infoContainer);
  return wordContainer;
};

export default renderWord;
