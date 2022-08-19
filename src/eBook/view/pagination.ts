const renderPagination = () => {
  const ul = document.createElement('ul');
  ul.classList.add('pagination-list');
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLDivElement;
  mainWrapper.appendChild(ul);
  const current = 4;
  const pageArr = ['prev', 1, current - 2, current - 1, current, current + 1, current + 2, current + 3, '...', 30, 'next'];
  let count = 0;
  pageArr.map((page) => {
    const pageLiElem = document.createElement('li');
    const pageBtn = document.createElement('button');
    pageBtn.setAttribute('class', `${page.toString()}Btn page-btn`);
    pageBtn.setAttribute('data-id', count.toString());
    pageBtn.textContent = page.toString();
    if (page === 1) {
      pageBtn.classList.add('active-btn');
    } else if (page === 'prev') {
      pageBtn.disabled = true;
    }
    count += 1;
    pageLiElem.appendChild(pageBtn);
    return ul.appendChild(pageLiElem);
  });
  return ul;
};

export default renderPagination;
