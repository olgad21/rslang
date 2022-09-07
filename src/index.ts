import renderApp from './app';
import './scss/styles.scss';

renderApp();

window.addEventListener('popstate', () => renderApp());
