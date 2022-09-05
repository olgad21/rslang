import createElement from '../helpers';
import renderPageContent from '../renderPageContent';
import './sidebar.scss';

const navItems = [
  {
    navName: 'Главная',
    navIcon: 'bi-house',
    navId: 'main-page',
  },
  {
    navName: 'Учебник',
    navIcon: 'bi-book',
    navId: 'ebook',
  },
  {
    navName: 'Игры',
    navIcon: 'bi-controller',
    navId: 'games',
  },
  {
    navName: 'Статистика',
    navIcon: 'bi-bar-chart',
    navId: 'statistics',
  },
];

const createNavItem = (navIcon: string, navName: string, navId: string) => {
  const navItem = createElement('li', 'nav-item');
  const icon = createElement('i', ['bi', navIcon]);
  const navLink = createElement('button', ['nav-link', 'py-3']);
  navLink.textContent = navName;

  navItem.append(icon, navLink);
  navItem.setAttribute('data-nav-id', navId);

  navItem.addEventListener('click', () => {
    window.history.pushState({ id: navId }, navId, `${navId}`);
    renderPageContent();
  });
  return navItem;
};

const renderNavigation = () => navItems.map(({ navIcon, navName, navId }) => createNavItem(navIcon, navName, navId));

const renderSidebar = () => {
  const sidebar = createElement('div', [
    'sidebar',
    'd-flex',
    'flex-column',
    'flex-shrink-0',
  ]);
  const menuIcon = createElement('i', ['menu-icon', 'bi', 'bi-list']);
  const navWrapper = createElement('ul', [
    'nav',
    'nav-pills',
    'nav-flush',
    'flex-column',
    'mb-auto',
  ]);
  const navigation = renderNavigation();
  navWrapper.append(...navigation);

  menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--active');
  });

  sidebar.append(menuIcon, navWrapper);
  return sidebar;
};

export default renderSidebar;
