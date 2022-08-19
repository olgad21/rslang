/* eslint-disable no-console */
import UserCredentials from '../Interfaces/UserCredentials';
import { host, path } from '../constants';
import UserAuthData from '../Interfaces/UserAuthData';

const loginUser = async (user: UserCredentials): Promise <UserAuthData> => {
  const response = await fetch(`${host}${path.signin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const userAuthData = await response.json();
  console.log(userAuthData);
  return userAuthData;
};

export default loginUser;
