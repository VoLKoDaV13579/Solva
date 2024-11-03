import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === 'admin' && data.password === 'password') {
      dispatch(login());
      navigate('/');
    } else {
      alert('Неправильный логин или пароль');
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow" style={{ width: '400px' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Авторизация</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  {...register('username')}
                  id="username"
                  className="form-control"
                  placeholder="Введите имя пользователя"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Введите пароль"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
