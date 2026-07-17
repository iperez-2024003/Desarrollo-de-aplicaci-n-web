import LoginForm from '../components/LoginForm';
import fondoLogin from '../../../assets/fondoLogin.jpg';

const LoginPage = () => {
  return (
    <main
      className="login-shell"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <LoginForm />
    </main>
  );
};

export default LoginPage;
