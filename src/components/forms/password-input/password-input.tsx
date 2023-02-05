import React, { useState, ChangeEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export type PasswordInputProps = {
  value: string;
  placeholder?: string;
  extraClass?: string;
  name?: string;
  required?: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, placeholder, extraClass, name, required, onChange }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleEyeIconClick = () => {
    setIsHidden((prevValue) => !prevValue);
  };

  return (
    <Input
      type={ isHidden ? 'password' : 'text' }
      placeholder={ placeholder }
      value={ value }
      name={ name }
      extraClass={ extraClass }
      required={ required }
      icon={ isHidden ? 'ShowIcon' : 'HideIcon' }
      onIconClick={ handleEyeIconClick }
      onChange={ onChange }
    />
  );
};
