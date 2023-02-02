import React, { FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../consts';
import { useForm } from '../../../hooks/use-form';
import { ForgotFormFields } from '../../../types/forms';

type ForgotFormProps = {
  onSubmit: (formData: ForgotFormFields) => void;
};

export const ForgotForm: React.FC<ForgotFormProps> = React.memo(({ onSubmit }) => {
  const [formData, setFormData] = useForm<ForgotFormFields>({
    email: '',
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="credentials-form mb-20" onSubmit={ handleFormSubmit }>
        <h2 className="mb-6">Восстановление пароля</h2>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={ formData.email }
          name="email"
          required
          extraClass="mb-6"
          onChange={ setFormData('email') }
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
