"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirigir al usuario o realizar acciones posteriores al inicio de sesión
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <section className='h-custom-height-mobile md:h-custom-height-desktop grid place-content-center'>
      <form className='flex flex-col gap-4' onSubmit={handleLogin}>
        <input
          className='border-jacaranda border-2 rounded p-2 font-medium text-sm'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          className='border-jacaranda border-2 rounded p-2 font-medium text-sm'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Contraseña'
        />
        {error && <p>{error}</p>}
        <button className="bg-jacaranda rounded p-2 font-light" type='submit'>Iniciar Sesión</button>
      </form>
    </section>
  );
};

export default Login;
