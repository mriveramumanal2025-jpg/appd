
import React, { useState } from 'react';
import type { NewUser } from '../types';

interface RegistrationFormProps {
  onSubmit: (user: NewUser) => void;
  isSubmitting: boolean;
}

const initialFormData: NewUser = {
  firstName: '',
  paternalLastName: '',
  maternalLastName: '',
  email: '',
  ci: '',
};

// Se movió InputField fuera de RegistrationForm para evitar que se vuelva a crear en cada renderizado,
// lo que provocaba que los campos de entrada perdieran el foco.
const InputField: React.FC<{
  name: keyof NewUser;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}> = ({ name, label, value, onChange, type = 'text', error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`} className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);


const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<NewUser>(initialFormData);
  const [errors, setErrors] = useState<Partial<NewUser>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<NewUser> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.paternalLastName.trim()) newErrors.paternalLastName = 'El apellido paterno es requerido';
    if (!formData.maternalLastName.trim()) newErrors.maternalLastName = 'El apellido materno es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del correo es inválido';
    }
    if (!formData.ci.trim()) newErrors.ci = 'El CI es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData(initialFormData);
      setErrors({});
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Formulario de Actualización</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              name="firstName" 
              label="Nombre" 
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName} 
            />
            <InputField 
              name="paternalLastName" 
              label="Apellido Paterno" 
              value={formData.paternalLastName}
              onChange={handleChange}
              error={errors.paternalLastName} 
            />
        </div>
        <InputField 
          name="maternalLastName" 
          label="Apellido Materno" 
          value={formData.maternalLastName}
          onChange={handleChange}
          error={errors.maternalLastName} 
        />
        <InputField 
          name="email" 
          label="Correo Electrónico" 
          type="email" 
          value={formData.email}
          onChange={handleChange}
          error={errors.email} 
        />
        <InputField 
          name="ci" 
          label="CI (Cédula de Identidad)" 
          value={formData.ci}
          onChange={handleChange}
          error={errors.ci} 
        />
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Datos'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
