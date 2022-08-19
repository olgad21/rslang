import { renderAuthorizationForm } from '../authorization/authorization';
import createElement from '../helpers';
import './header.scss';

const renderHeader = () => {
  const header = createElement('header', 'header');
  const loginIcon = createElement('i', ['login__icon', 'bi', 'bi-box-arrow-in-right']);
  loginIcon.addEventListener('click', () => {
    renderAuthorizationForm();
  });
  header.append(loginIcon);
  return header;
};

export default renderHeader;
