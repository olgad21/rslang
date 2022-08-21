import { userPosition } from '../../helpers';

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
      pageBtn.disabled = true;
      pageBtn.classList.add('start-btn', 'not-active-btn');
    } else if (page === '<') {
      pageBtn.disabled = true;
      pageBtn.classList.add('prev-btn', 'not-active-btn');
    } else if (page === 1) {
      pageBtn.classList.add('active-element', 'current-btn');
    } else if (page === '>') {
      pageBtn.classList.add('next-btn', 'active-element');
    } else {
      pageBtn.classList.add('end-btn', 'active-element');
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
