/* eslint-disable no-console */
import {
  handleToggleForms,
  renderAuthorizationForm,
} from './authorization/authorization';
import createElement from '../helpers';
import './header.scss';
import { handleLogoutUser } from '../API/loginUser.api';

const renderHeader = () => {
  const header = createElement('header', 'header');

  let loginIcon: HTMLElement;
  if (localStorage.getItem('token')) {
    loginIcon = createElement('i', ['login__icon', 'bi', 'bi-box-arrow-right']);
  } else {
    loginIcon = createElement('i', ['login__icon', 'bi', 'bi-person-circle']);
  }
  renderAuthorizationForm();
  const authPopup = document.querySelectorAll('.auth__popup')[0];
  authPopup?.classList.add('auth__popup--inactive');
  loginIcon.addEventListener('click', (event: Event) => {
    if (loginIcon.classList.contains('bi-person-circle')) {
      const authPopupRerendered = document.querySelector('.auth__popup');
      authPopupRerendered?.classList.remove('auth__popup--inactive');
      handleToggleForms();
    } else {
      handleLogoutUser(event);
    }
  });
  header.append(loginIcon);
  return header;
};

export default renderHeader;
