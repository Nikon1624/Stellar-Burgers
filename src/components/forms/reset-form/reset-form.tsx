import React, { FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '../password-input/password-input';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../consts';
import { useForm } from '../../../hooks/use-form';
import { ResetFormFields } from '../../../types/forms';

type ResetFormProps = {
  onSubmit: (formData: ResetFormFields) => void;
};

export const ResetForm: React.FC<ResetFormProps> = React.memo(({ onSubmit }) => {
  const [formData, setFormData] = useForm<ResetFormFields>({
    password: '',
    token: '',
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="credentials-form mb-20" onSubmit={ handleFormSubmit }>
        <h2 className="mb-6">Восстановление пароля</h2>
        <PasswordInput
          value={ formData.password }
          placeholder="Введите новый пароль"
          name="password"
          required
          extraClass="mb-6"
          onChange={ setFormData('password') }
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          value={ formData.token }
          required
          extraClass="mb-6"
          onChange={ setFormData('token') }
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className="credentials-form-footer">
        <p className="mb-4">
          Вспомнили пароль? <Link to={ AppRoute.LoginPage }>Войти</Link>
        </p>
      </div>
    </>
  );
});
