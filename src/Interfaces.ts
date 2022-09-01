interface UserAuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
}

interface UserData {
  id: string;
  email: string;
}

export { UserData, UserCredentials, UserAuthData };
