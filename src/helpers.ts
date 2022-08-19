const createElement = (tag: string, classNames?: string | string[]) => {
  const el = document.createElement(tag);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else {
    el.classList.add(classNames ?? '');
  }
  return el;
};

export default createElement;
