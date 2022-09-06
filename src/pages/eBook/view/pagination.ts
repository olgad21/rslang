import { userPosition } from '../../../helpers';

const renderPagination = () => {
  const ul = document.createElement('ul');
  ul.classList.add('pagination-list');
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
  mainWrapper.appendChild(ul);

  const userLevel = userPosition();
  const current = userLevel.page;
  const pageArr = ['<<', '<', current, '>', '>>'];
  let count = 0;
  pageArr.map((page) => {
    const pageLiElem = document.createElement('li');
    const pageBtn = document.createElement('button');
    pageBtn.classList.add('page-btn');
    if (page === '<<') {
      if (current <= 1) {
        pageBtn.disabled = true;
      } else {
        pageBtn.classList.add('active-element');
      }
      pageBtn.classList.add('start-btn');
    } else if (page === '<') {
      if (current <= 1) {
        pageBtn.disabled = true;
      } else {
        pageBtn.classList.add('active-element');
      }
      pageBtn.classList.add('prev-btn');
    } else if (page === current) {
      pageBtn.classList.add('active-element', 'current-btn');
    } else if (page === '>') {
      if (current >= 30) {
        pageBtn.disabled = true;
      } else {
        pageBtn.classList.add('active-element');
      }
      pageBtn.classList.add('next-btn');
    } else {
      if (current >= 30) {
        pageBtn.disabled = true;
      } else {
        pageBtn.classList.add('active-element');
      }
      pageBtn.classList.add('end-btn');
    }
    pageBtn.setAttribute('data-id', count.toString());
    pageBtn.textContent = page.toString();
    count += 1;
    pageLiElem.appendChild(pageBtn);
    return ul.appendChild(pageLiElem);
  });
  return ul;
};

export default renderPagination;
