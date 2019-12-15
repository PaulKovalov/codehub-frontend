export interface BaseUserData {
  email: string;
  password: string;
}

export interface UserData extends BaseUserData {
  username: string;
  confirmPassword: string;
}
