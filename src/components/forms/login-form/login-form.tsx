import React, { FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../consts';
import { useForm } from '../../../hooks/use-form';
import { PasswordInput } from '../password-input/password-input';
import { LoginFormFields } from '../../../types/forms';

type LoginFormProps = {
  onSubmit: (formData: LoginFormFields) => void;
};

export const LoginForm: React.FC<LoginFormProps> = React.memo(({ onSubmit }) => {
  const [formData, setFormData] = useForm<LoginFormFields>({
    email: '',
    password: '',
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="credentials-form mb-20" onSubmit={ handleFormSubmit }>
        <h2 className="mb-6">Вход</h2>
        <Input
          type="email"
          placeholder="E-mail"
          value={ formData.email }
          name="email"
          error={ false }
          extraClass="mb-6"
          required
          onChange={ setFormData('email') }
        />
        <PasswordInput
          value={ formData.password }
          placeholder="Password"
          name="password"
          required
          extraClass="mb-6"
          onChange={ setFormData('password') }
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className="credentials-form-footer">
        <p className="mb-4">
          Вы — новый пользователь? <Link to={ AppRoute.RegisterPage }>Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль? <Link to={ AppRoute.ForgotPasswordPage }>Восстановить пароль</Link>
        </p>
      </div>
    </>
  );
});
