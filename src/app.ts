import renderPageContent from './renderPageContent';
import renderFooter from './components/footer';
import renderHeader from './components/header';
import renderSidebar from './components/sidebar';
import createElement from './helpers';

const renderApp = () => {
  const wrapper = document.createElement('div');
  const mainWrapper = createElement('div', 'main__wrapper');
  wrapper.classList.add('wrapper');
  document.body.append(wrapper);

  const header = renderHeader();
  const sidebar = renderSidebar();
  const footer = renderFooter();

  wrapper.append(header, sidebar, mainWrapper, footer);

  renderPageContent();
};

export default renderApp;
