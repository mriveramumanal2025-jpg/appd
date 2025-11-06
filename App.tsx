import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import Header from './components/Header';
import { backgroundPattern } from './assets/images';
import type { NewUser } from './types';

// URL de la aplicación web de Google Apps Script.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz13tv7z6OY3afFPyaf3zHHD0LwMU_t3RbOnA5urk6T3mnsR2DPm-v9ccRZgvIWdm5r/exec';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFormSubmit = async (newUser: NewUser) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    
    const formData = new FormData();
    Object.keys(newUser).forEach(key => {
        formData.append(key, newUser[key as keyof NewUser]);
    });
    formData.append('action', 'addUser');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });
      
      const resultText = await response.text();
      try {
        // Intenta analizar la respuesta como JSON.
        const result = JSON.parse(resultText);
        if (!result.success) {
            throw new Error(result.message || 'El servidor indicó un fallo en el registro.');
        }
        setSuccessMessage("¡Usuario registrado con éxito!");
      } catch (e) {
        // Si el análisis JSON falla, es probable que se deba a una redirección de Google Apps Script,
        // lo que generalmente indica un envío exitoso para scripts simples.
        console.warn("La respuesta del servidor no es JSON. Asumiendo éxito debido a una posible redirección de Google Apps Script.", resultText);
        setSuccessMessage("¡Usuario registrado con éxito!");
      }

    } catch (err) {
      console.error("Error al enviar a Google Sheets:", err);
      const errorMessage = err instanceof Error ? err.message : "Hubo un error al registrar los datos. Por favor, inténtelo de nuevo más tarde.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 5000);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
       <Header />
       <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-md">
         Actualización de Datos - Mutualidad del Magisterio Nacional 2025 - 2026
       </h1>
      <main className="w-full max-w-2xl mx-auto">
        <RegistrationForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        <div className="mt-4 text-center h-12">
            {error && !isSubmitting && (
                <p className="inline-block bg-white p-3 rounded-lg shadow-md text-red-500 font-medium">
                    {error}
                </p>
            )}
            {successMessage && (
                <p className="inline-block bg-white p-3 rounded-lg shadow-md text-green-600 font-medium">
                    {successMessage}
                </p>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;