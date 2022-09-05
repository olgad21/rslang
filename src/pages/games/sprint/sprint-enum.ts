/* eslint-disable max-len */
const enum Sprint {
  levl = 'Уровень: ',
  title = 'Ваш результат: ',
  timer = '60',
  btnFalse = 'False',
  btnTrue = 'True',
}

const enum Modal {
  yourResults = 'Ваш результат: ',
  correctAnswer = 'Правильных ответов: ',
  incorrectAnswer = 'Не правильных ответов: ',
  return = 'Повторить',
  menu = 'Меню',
}

const enum SprintMenu {
  title = 'СПРИНТ',
  description = 'СПРИНТ - игра, где Вы за отведенное время должны сказать, правильно ли программа подобрала перевод для слова на английском языке. Постарайтесь набрать наибольшее количество баллов!',
  btn = 'играть',
}

const enum AudioMenu {
  title = 'АУДИОВЫЗОВ',
  description = 'АУДИОВЫЗОВ - игра, где Вы должны выбрать правильный перевод слова, которое можно прослушать. Для прослушивания слова нажмите на изображение динамика. Постарайтесь набрать наибольшее количество баллов!',
  btn = 'играть',
}

export {
  Sprint, Modal, SprintMenu, AudioMenu,
};
