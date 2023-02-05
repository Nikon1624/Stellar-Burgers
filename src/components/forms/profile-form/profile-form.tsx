import React, { FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '../password-input/password-input';
import { useForm } from '../../../hooks/use-form';
import { RegisterFormFields } from '../../../types/forms';
import { useAppSelector } from '../../../hooks/state';
import { getUser } from '../../../store/user-slice/selectors';

type ProfileFormProps = {
  onSubmit: (formData: RegisterFormFields) => void;
};

export const ProfileForm: React.FC<ProfileFormProps> = React.memo(({ onSubmit }) => {
  const user = useAppSelector(getUser);

  const [formData, setFormData] = useForm<RegisterFormFields>({
    password: '',
    name: user ? user.name : '',
    email: user ? user.email : '',
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="credentials-form mb-20" onSubmit={ handleFormSubmit }>
        <Input
          type="text"
          placeholder="Имя"
          value={ formData.name }
          required
          extraClass="mb-6"
          onChange={ setFormData('name') }
        />
        <Input
          type="email"
          placeholder="Логин"
          value={ formData.email }
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
          Сохранить
        </Button>
      </form>
    </>
  );
});
