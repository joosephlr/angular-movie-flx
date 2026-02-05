export interface User {
    email: string;
    password: string;
}

export interface UserResponse {
  token: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}