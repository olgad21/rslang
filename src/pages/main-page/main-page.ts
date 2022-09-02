import { createElement, removeAllChildNodes } from '../../helpers';
import './main-page.scss';
import {
  strings,
  CreatorDescription,
  creatorsDescriptions,
  mainDescriptions,
} from '../../constants';

const createMainMessage = (img: string, message: string) => {
  const mainMessage = createElement('div', ['main__message']);
  const messageText = createElement('div', 'main__message-text');
  messageText.textContent = message;
  const messageImg = createElement(
    'img',
    'main__message-img',
  ) as HTMLImageElement;
  messageImg.src = img;
  mainMessage.append(messageImg, messageText);
  return mainMessage;
};

const renderMainMessages = () => mainDescriptions.map(({ img, message }) => createMainMessage(img, message));

const createCreatorDescription = (creator: CreatorDescription) => {
  const {
    img, name, role, githubLink, description,
  } = creator;
  const creatorDescription = createElement('div', ['creators__item']);
  const creatorText = createElement('div', 'creator-text');
  creatorText.textContent = description;
  const creatorName = createElement('div', 'creator-name');
  creatorName.textContent = name;
  const creatorRole = createElement('div', 'creator-role');
  creatorRole.textContent = role;
  const creatorImg = createElement('img', 'creator-img') as HTMLImageElement;
  creatorImg.src = img;
  const creatorLink = createElement('a', 'creator-link') as HTMLAnchorElement;
  creatorLink.href = githubLink;
  creatorDescription.append(
    creatorImg,
    creatorName,
    creatorRole,
    creatorText,
    creatorLink,
  );
  return creatorDescription;
};

const renderCreatorDescriptions = () => creatorsDescriptions.map(createCreatorDescription);

export const renderMainContent = () => {
  const mainPageContent = createElement('div', 'main-container');

  const mainContent = createElement('div', 'main-content__wrapper');

  const imageWrapper = createElement('div', 'image__wrapper');
  const mainLogo = createElement('h1', 'main__logo');
  mainLogo.textContent = 'RS Lang';
  const mainBtn = createElement('button', [
    'main__button',
    'btn',
    'btn-dark',
  ]) as HTMLButtonElement;
  mainBtn.textContent = strings.registration;
  imageWrapper.append(mainLogo, mainBtn);

  const textWrapper = createElement('div', 'text__wrapper');
  const mainMessages = renderMainMessages();
  textWrapper.append(...mainMessages);

  mainContent.append(imageWrapper, textWrapper);

  const creatorsContent = createElement('div', 'creators-content__wrapper');
  const creatorsWrapper = createElement('div', 'creators-info__wrapper');
  const creatorsInfo = renderCreatorDescriptions();
  const creatorsTitle = createElement('h2', 'creators-content__title');
  creatorsTitle.textContent = strings.creatorsTitle;
  creatorsWrapper.append(...creatorsInfo);

  creatorsContent.append(creatorsTitle, creatorsWrapper);

  mainPageContent.append(mainContent, creatorsContent);

  return mainPageContent;
};

const renderMainPage = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const mainContent = renderMainContent();
  removeAllChildNodes(mainWrapper);
  mainWrapper?.append(mainContent);
};

export default renderMainPage;
