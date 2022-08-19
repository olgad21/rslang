/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import createUser from '../API/createUser.api';
import loginUser from '../API/loginUser.api';
import strings from '../constants';
import createElement from '../helpers';
import UserAuthData from '../Interfaces/UserAuthData';
import UserCredentials from '../Interfaces/UserCredentials';
import UserData from '../Interfaces/UserData';
import './authorization.scss';

type SendUserDataType = (obj: UserCredentials) => Promise <UserData> | Promise <UserAuthData>;

const sendUserData = () => {

};

const inputData = [
  {
    id: 'email-form',
    labelName: 'Email: ',
  },
  {
    id: 'password-form',
    labelName: 'Password: ',
  },
];

const createInput = (id: string, labelName: string) => {
  const inputWrapper = createElement('div', 'auth__input-wrapper');
  const label = createElement('label', 'form-label') as HTMLFormElement;
  label.for = id;
  label.textContent = labelName;
  const input = createElement('input', 'form-control') as HTMLInputElement;
  input.id = id;
  input.type = 'text';
  input.required = true;
  const validationFeedback = createElement('div', 'valid-feedback');
  validationFeedback.textContent = 'Отлично!';

  inputWrapper.append(label, input, validationFeedback);
  return inputWrapper;
};

const renderInputs = () => (
  inputData.map(({ id, labelName }) => createInput(id, labelName))
);

const validateForm = () => {
  const form = document.querySelector('.needs-validation') as HTMLSelectElement;
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
};

const renderForm = (title: string, btnName: string, callback?: SendUserDataType) => {
  const authPopup = createElement('div', ['auth__popup']);
  document.body.append(authPopup);

  const authPopupContent = createElement('div', ['auth__popup-content']);
  const authTitle = createElement('h2', 'auth__title');

  authTitle.textContent = title;

  const inputForm = createElement('form', ['needs-validation', 'auth__form']);
  const inputs = renderInputs();
  inputForm.append(...inputs);

  const authBtn = createElement('button', ['btn', 'btn-dark', 'auth__button']);
  authBtn.textContent = btnName;

  authBtn.addEventListener('click', async () => createUser({ name: 'olya', email: 'olya@gmail.com', password: 'Gfhjkm_123' }));

  const authAccountMsg = createElement('p', 'auth__message-text');
  const authAccountMsgBtn = createElement('button', ['btn', 'btn-light', 'auth__message-button']);

  if (title === strings.loginForm) {
    authAccountMsg.textContent = strings.loginQuestion;
    authAccountMsgBtn.textContent = strings.regSubmit;
  } else {
    authAccountMsg.textContent = strings.regQuestion;
    authAccountMsgBtn.textContent = strings.loginSubmit;
  }

  authPopupContent.append(authTitle, inputForm, authBtn, authAccountMsg, authAccountMsgBtn);
  authPopup.append(authPopupContent);

  authPopup.addEventListener('click', () => {
    authPopup.classList.add('auth__popup--inactive');
  });
};

// TODO: дописать валидацию, исправить отправку данных на сервер, переключение между формами

export const renderAuthorizationForm = () => {
  renderForm(strings.loginForm, strings.loginSubmit);
};
const renderRegistrationForm = () => {
  renderForm(strings.regForm, strings.regSubmit);
};

export default renderRegistrationForm;
