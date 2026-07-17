import RegisterForm from '../components/RegisterForm';
import fondoLogin from '../../../assets/fondoLogin.jpg';

const RegisterPage = () => {
  return (
    <main
      className="login-shell"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
