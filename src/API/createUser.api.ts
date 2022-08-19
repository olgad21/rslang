/* eslint-disable no-console */
import { host, path } from '../constants';
import UserCredentials from '../Interfaces/UserCredentials';
import UserData from '../Interfaces/UserData';

const createUser = async (user: UserCredentials): Promise <UserData> => {
  const response = await fetch(`${host}${path.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const userData = await response.json();

  return userData;
};

export default createUser;
