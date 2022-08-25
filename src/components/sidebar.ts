import { createElement } from '../helpers';
import './sidebar.scss';

const navItems = [{
  navName: 'Главная',
  navIcon: 'bi-house',
}, {
  navName: 'Учебник',
  navIcon: 'bi-book',
}, {
  navName: 'Словарь',
  navIcon: 'bi-journal-text',
},
{
  navName: 'Игры',
  navIcon: 'bi-controller',
}, {
  navName: 'Статистика',
  navIcon: 'bi-bar-chart',
}];

const createNavItem = (navIcon: string, navName: string) => {
  const navItem = createElement('li', 'nav-item');
  const icon = createElement('i', ['bi', navIcon]);
  const navLink = createElement('button', ['nav-link', 'py-3']);
  navLink.textContent = navName;

  navItem.append(icon, navLink);
  return navItem;
};

const renderNavigation = () => (
  navItems.map(({ navIcon, navName }) => createNavItem(navIcon, navName))
);

const renderSidebar = () => {
  const sidebar = createElement('div', ['sidebar', 'd-flex', 'flex-column', 'flex-shrink-0']);
  const menuIcon = createElement('i', ['menu-icon', 'bi', 'bi-list']);
  const navWrapper = createElement('ul', ['nav', 'nav-pills', 'nav-flush', 'flex-column', 'mb-auto']);
  const navigation = renderNavigation();
  navWrapper.append(...navigation);

  menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--active');
  });

  sidebar.append(menuIcon, navWrapper);
  return sidebar;
};

export default renderSidebar;
