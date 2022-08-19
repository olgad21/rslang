import { API_URL, Word } from '../../constants';

const renderWord = (word: Word) => `
  <div class="word-container" data-id="${word.id}">
    <div class="word-img">
      <img src="${API_URL}/${word.image}">
    </div>
    <div class="info-container">
      <div class="word-info">

        <div class="text-box">
          <p class="english">${word.word}</p>
          <p class="transcription">${word.transcription}</p>
          <p class="translation">${word.wordTranslate}</p>
        </div>

        <div class="sound">
          <button class="sound-image"></button>
          <audio src="${API_URL}/${word.audio}"></audio>
          <audio src="${API_URL}/${word.audioMeaning}"></audio>
          <audio src="${API_URL}/${word.audioExample}"></audio>        
        </div>

      </div>

      <div class="word-meaning">
        <div class="text-meaning">${word.textMeaning}</div>
        <div class="text-meaning-translate">${word.textMeaningTranslate}</div>
      </div>

      <div class=""word-examples>
        <div class="text-examples">${word.textExample}</div>
        <div class="text-examples-translate">${word.textExampleTranslate}</div>
      </div>
      
    </div>
  </div>
`;

export default renderWord;
