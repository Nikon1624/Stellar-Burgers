import { ChangeEvent, useState } from 'react';

export const useForm = <T extends object>(initialFormData: T): [T, (fieldName: keyof T) => (evt: ChangeEvent<HTMLInputElement>) => void] => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChangeChange = (fieldName: keyof T) => (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: evt.target.value,
    }));
  };

  return [formData, handleFieldChangeChange];
};
