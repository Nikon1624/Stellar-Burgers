import React, { FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '../password-input/password-input';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../consts';
import { useForm } from '../../../hooks/use-form';
import { RegisterFormFields } from '../../../types/forms';

type RegisterFormProps = {
  onSubmit: (formData: RegisterFormFields) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = React.memo(({ onSubmit }) => {
  const [formData, setFormData] = useForm<RegisterFormFields>({
    name: '',
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
        <h2 className="mb-6">Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          value={ formData.name }
          name="name"
          required
          extraClass="mb-6"
          onChange={ setFormData('name') }
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={ formData.email }
          name="email"
          required
          extraClass="mb-6"
          onChange={ setFormData('email') }
        />
        <PasswordInput
          value={ formData.password }
          placeholder="Пароль"
          name="password"
          required
          extraClass="mb-6"
          onChange={ setFormData('password') }
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className="credentials-form-footer">
        <p className="mb-4">
          Уже зарегистрированы? <Link to={ AppRoute.LoginPage }>Войти</Link>
        </p>
      </div>
    </>
  );
});
