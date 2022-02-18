import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../context/appContext';

const initialState = {
  email: '',
  password: '',
  showAlert: false,
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert } = useAppContext();

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    if (!name || !email || !password) {
      displayAlert();
      return;
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmitHandler}>
        <Logo />
        <h3>Login</h3>
        {showAlert && <Alert type="success" message="test" />}
        <FormRow type="email" name="email" onChange={onChangeHandler} />
        <FormRow type="password" name="password" onChange={onChangeHandler} />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Don't have account yet?{' '}
          <Link to="/register" className="btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
