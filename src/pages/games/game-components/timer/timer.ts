import createModal from '../../game-components/modal/modal';

const getNewValue = (place: HTMLElement) => {
  const prevValue: number = parseInt(<string>place.textContent, 10);
  let nextValue: number = prevValue - 1;

  const timer = setInterval(() => {
    if (nextValue === 0) {
      clearInterval(timer);
      createModal();
    } else {
      place.textContent = '';
      place.textContent = String(<number>nextValue);
      nextValue -= 1;
    }
  }, 1000);
};

export default getNewValue;
