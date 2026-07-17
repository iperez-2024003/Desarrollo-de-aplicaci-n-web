import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (feedback.message) {
      setFeedback({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Las contraseñas no coinciden.',
      });
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setFeedback({
        type: 'success',
        message: 'Cuenta creada correctamente. Ahora puedes iniciar sesión.',
      });
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch {
      // el error ya queda guardado en el store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-card">
      <p className="login-card__eyebrow">Gestión de tareas</p>
      <h1 className="login-card__title">Crea tu cuenta</h1>

      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Nombre completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          autoComplete="name"
          required
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="new-password"
          required
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="new-password"
          required
          className="form-input"
        />
      </div>

      {(error || feedback.message) && (
        <p className={feedback.type === 'success' ? 'form-success' : 'form-error'}>
          {feedback.message || error}
        </p>
      )}

      <button type="submit" disabled={isLoading} className="form-submit">
        {isLoading ? 'Creando cuenta...' : 'Registrarme'}
      </button>

      <p className="form-register">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="form-register-link">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
