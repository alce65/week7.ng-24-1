export type UserLoginDto = {
  name?: string;
  email?: string;
  password: string;
};

export type UserRegisterDto = {
  name: string;
  email: string;
  password: string;
  avatar: File;
  birthDateString: string;
};
