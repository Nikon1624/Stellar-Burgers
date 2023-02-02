export type LoginFormFields = {
  email: string;
  password: string;
};

export type RegisterFormFields = {
  name: string;
} & LoginFormFields;

export type ForgotFormFields = Pick<LoginFormFields, 'email'>;

export type ResetFormFields = {
  password: string;
  token: string;
};
