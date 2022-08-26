<<<<<<< HEAD
import { handleToggleForms, renderAuthorizationForm } from '../authorization/authorization';
=======
import { handleToggleForms, renderAuthorizationForm } from './authorization/authorization';
>>>>>>> develop
import createElement from '../helpers';
import './header.scss';

const renderHeader = () => {
  const header = createElement('header', 'header');
  const loginIcon = createElement('i', ['login__icon', 'bi', 'bi-person-circle']);
  renderAuthorizationForm();
<<<<<<< HEAD
  const authPopup = document.getElementsByClassName('auth__popup')[0];
=======
  const authPopup = document.querySelectorAll('.auth__popup')[0];
>>>>>>> develop
  authPopup?.classList.add('auth__popup--inactive');
  loginIcon.addEventListener('click', () => {
    const authPopupRerendered = document.getElementsByClassName('auth__popup')[0];
    authPopupRerendered?.classList.remove('auth__popup--inactive');
    handleToggleForms();
  });
  header.append(loginIcon);
  return header;
};

export default renderHeader;
