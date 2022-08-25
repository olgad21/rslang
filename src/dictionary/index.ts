import { renderEBookHeader } from '../eBook/view/renderBook';
import renderDictionary from './view/renderDictionary';
import './view/dictionary.scss';

const handleDictionaryIconClick = () => {
  const eDictionaryBtn = document.querySelector('.bi-journal-text') as HTMLDivElement;
  eDictionaryBtn.addEventListener('click', async () => {
    renderEBookHeader();
    renderDictionary();
  });
};
export default handleDictionaryIconClick;
