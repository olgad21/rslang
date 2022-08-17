import renderHeader from '../components/header';
import renderSidebar from '../components/sidebar';
import renderFooter from '../components/footer';
import createElement from '../helpers';

const renderMainContent = () => {
  const mainContent = createElement('div', 'main__wrapper');
  return mainContent;
};

const renderMainPage = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.append(wrapper);

  const header = renderHeader();
  const sidebar = renderSidebar();
  const footer = renderFooter();
  const mainContent = renderMainContent();

  wrapper.append(header, sidebar, mainContent, footer);

  return wrapper;
};

export default renderMainPage;
