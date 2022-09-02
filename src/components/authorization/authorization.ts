import createUser from '../../API/createUser.api';
import loginUser from '../../API/loginUser.api';
import { strings } from '../../constants';
import { createElement } from '../../helpers';
import './authorization.scss';

const inputData = [
  {
    id: 'name-form',
    labelName: 'Имя ',
  },
  {
    id: 'email-form',
    labelName: 'Электронная почта ',
  },
  {
    id: 'password-form',
    labelName: 'Пароль ',
  },
];

const createInput = (id: string, labelName: string) => {
  const inputWrapper = createElement('div', 'auth__input-wrapper');
  const label = createElement('label', 'form-label') as HTMLFormElement;
  label.for = id;
  label.textContent = labelName;
  const input = createElement('input', 'form-control') as HTMLInputElement;
  input.id = id;
  input.required = true;
  if (id === 'password-form') {
    input.type = 'password';
    input.minLength = 8;
    input.autocomplete = 'on';
  } else if (id === 'email-form') {
    input.type = 'email';
  } else {
    input.type = 'text';
    input.required = false;
  }

  inputWrapper.append(label, input);
  return inputWrapper;
};

const renderInputs = () => inputData.map(({ id, labelName }) => createInput(id, labelName));

const renderForm = (title: string, btnName: string) => {
  const authPopup = createElement('div', ['auth__popup']);
  document.body.append(authPopup);

  const authPopupInner = createElement('div', ['auth__popup-content']);
  const authTitle = createElement('h2', 'auth__title');

  authTitle.textContent = title;

  const inputForm = createElement('form', ['auth__form']);
  const inputs = renderInputs();

  const authBtn = createElement('button', [
    'btn',
    'btn-dark',
    'auth__button',
  ]) as HTMLButtonElement;
  authBtn.textContent = btnName;
  authBtn.type = 'submit';

  inputForm.append(...inputs, authBtn);

  const authAccountMsg = createElement('p', 'auth__message-text');
  const authAccountMsgBtn = createElement('button', [
    'btn',
    'btn-light',
    'auth__message-button',
  ]);

  const closeBtn = createElement('button', ['auth__btn-close', 'btn-close']);

  closeBtn.addEventListener('click', () => {
    authPopup.classList.add('auth__popup--inactive');
  });

  authPopupInner.append(
    closeBtn,
    authTitle,
    inputForm,
    authAccountMsg,
    authAccountMsgBtn,
  );
  authPopup.append(authPopupInner);

  if (title === strings.loginForm) {
    authAccountMsg.textContent = strings.loginQuestion;
    authAccountMsgBtn.textContent = strings.regSubmit;
    authPopup.setAttribute('data-form', 'login');
    const nameInput = document.getElementById('name-form') as HTMLInputElement;
    if (nameInput.parentElement) {
      nameInput.parentElement.style.display = 'none';
    }
    inputForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (document.getElementById('email-form') as HTMLInputElement)
        ?.value;
      const password = (
        document.getElementById('password-form') as HTMLInputElement
      )?.value;
      try {
        await loginUser({ email, password });
      } catch (error) {
        const errMessageText = error instanceof Error ? error.message : error;
        const errorMessage = createElement('div', 'auth__error-message');
        if (typeof errMessageText === 'string') {
          errorMessage.textContent = errMessageText;
          authPopupInner.append(errorMessage);
        }
      }
    });
  } else {
    authAccountMsg.textContent = strings.regQuestion;
    authAccountMsgBtn.textContent = strings.loginSubmit;
    authPopup.setAttribute('data-form', 'registration');
    authBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      let name = (document.getElementById('name-form') as HTMLInputElement)
        ?.value;
      if (!name) {
        name = ' ';
      }
      const email = (document.getElementById('email-form') as HTMLInputElement)
        ?.value;
      const password = (
        document.getElementById('password-form') as HTMLInputElement
      )?.value;
      try {
        await createUser({ name, email, password });
        await loginUser({ email, password });
      } catch (error) {
        const errorMessage = createElement('div', 'auth__error-message');
        if (typeof error === 'string') {
          errorMessage.textContent = error;
          authPopupInner.append(errorMessage);
        }
      }
    });
  }
};

export const renderAuthorizationForm = () => {
  renderForm(strings.loginForm, strings.loginSubmit);
};
const renderRegistrationForm = () => {
  renderForm(strings.regForm, strings.regSubmit);
};

export const handleToggleForms = () => {
  const authFormToggle = document.querySelector('.auth__message-button');
  authFormToggle?.addEventListener('click', () => {
    const currForm = document.querySelector('.auth__popup') as HTMLElement;
    if (currForm?.dataset.form === 'login') {
      currForm.remove();
      renderRegistrationForm();
      handleToggleForms();
    } else {
      currForm?.remove();
      renderAuthorizationForm();
      handleToggleForms();
    }
  });
};

export default renderRegistrationForm;
