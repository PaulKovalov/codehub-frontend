export interface BaseUserData {
  email: string;
  password: string;
}

export interface UserData extends BaseUserData {
  username: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface NonAuthorizedUser {
  authenticated: string;
}
