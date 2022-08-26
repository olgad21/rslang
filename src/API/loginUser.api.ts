import { UserCredentials, UserAuthData } from '../Interfaces';
import { host, path } from '../constants';

const closeLoginIconOnSuccess = () => {
  const loginIcon = document.querySelector('.bi-person-circle');
  loginIcon?.classList.replace('bi-person-circle', 'bi-box-arrow-right');
  const authPopup = document.getElementsByClassName('auth__popup')[0];
  authPopup?.classList.add('auth__popup--inactive');
};

const handleLogoutUser = () => {
  const logoutIcon = document.querySelector('.bi-box-arrow-right');
  logoutIcon?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    logoutIcon?.classList.replace('bi-box-arrow-right', 'bi-person-circle');
  });
};

const loginUser = async (user: UserCredentials): Promise <UserAuthData> => {
  const response = await fetch(`${host}${path.signin}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Неверно указана электронная почта и/или пароль');
  }

  const userAuthData = await response.json();
  localStorage.setItem('token', userAuthData.token);
  localStorage.setItem('user_id', userAuthData.userId);
  closeLoginIconOnSuccess();
  handleLogoutUser();
  return userAuthData;
};

export default loginUser;
