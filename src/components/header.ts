import createElement from '../helpers';
import './header.css';

const renderHeader = () => {
  const header = createElement('header', 'header');
  const loginIcon = createElement('i', ['login__icon', 'bi', 'bi-box-arrow-in-right']);
  header.append(loginIcon);
  return header;
};

export default renderHeader;
