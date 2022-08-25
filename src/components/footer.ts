import { createElement } from '../helpers';
import './footer.scss';

const creatorsData = [
  {
    link: 'https://github.com/irynakolh',
    name: 'Iryna Kolhanova',
  },
  {
    link: 'https://github.com/olgad21',
    name: 'Olga Dashuk',
  },
  {
    link: 'https://github.com/marusovalexei',
    name: 'Marusov Alexei',
  },
];

const createFooterLink = (link: string, name: string) => {
  const footerLink = createElement('a', ['footer__link']) as HTMLAnchorElement;
  footerLink.href = link;
  footerLink.target = '_blank';
  footerLink.textContent = name;
  return footerLink;
};

const renderFooterLinks = () => creatorsData.map(({ link, name }) => createFooterLink(link, name));

const renderFooter = () => {
  const footer = createElement('footer', 'footer');
  const footerLinks = renderFooterLinks();
  const footerYear = createElement('p', 'footer__year');
  footerYear.textContent = '2022';
  const footerLogo = createElement('a', 'footer__logo') as HTMLAnchorElement;
  footerLogo.href = 'https://rs.school/js/';
  footerLogo.target = '_blank';
  footer.append(footerLogo, ...footerLinks, footerYear);
  return footer;
};

export default renderFooter;
