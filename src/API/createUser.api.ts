import { host, path } from '../constants';
import UserData, { UserCredentials } from '../Interfaces';

const createUser = async (user: UserCredentials): Promise <UserData> => {
  const response = await fetch(`${host}${path.users}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const data = await response.json();
    const errMessage = data.error.errors[0].message;
    return Promise.reject(errMessage);
  }

  const userData = await response.json();
  localStorage.setItem('user_id', userData.id);
  return userData;
};

export default createUser;
