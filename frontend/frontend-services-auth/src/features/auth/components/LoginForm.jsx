import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch {
      // el error ya queda guardado en el store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-card">
      <p className="login-card__eyebrow">Gestión de tareas</p>
      <h1 className="login-card__title">Inicia sesión</h1>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@correo.com"
          autoComplete="email"
          required
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
          className="form-input"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" disabled={isLoading} className="form-submit">
        {isLoading ? 'Ingresando...' : 'Ingresar'}
      </button>

      <p className="form-register">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="form-register-link">
          Regístrate
        </Link>
      </p>

    </form>
  );
};

export default LoginForm;