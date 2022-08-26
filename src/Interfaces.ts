export interface UserAuthData {
  'message': string,
  'token': string,
  'refreshToken': string,
  'userId': string,
  'name': string
}

export interface UserCredentials {
  name?: string,
  email: string,
  password: string,
}

interface UserData {
  'id': string,
  'email': string,
}

export default UserData;
