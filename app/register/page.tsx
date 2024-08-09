// components/Register.tsx

'use client'

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      // Registro exitoso, redirigir o mostrar un mensaje
      console.log('User registered successfully');
    } catch (error) {
      setError('Error registering user: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='h-custom-height-mobile md:h-custom-height-desktop grid place-content-center'>
      <h1>Register</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <input
            className='border-jacaranda border-2 rounded p-2 font-medium text-sm'
            type='email'
            id='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className='border-jacaranda border-2 rounded p-2 font-medium text-sm'
            type='password'
            id='password'
            value={password}
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className='bg-jacaranda rounded p-2 font-light'
          type='submit'
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};

export default Register;
