import { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alert } from '../components';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser } = useAppContext();

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

    const currentUser = { name, email, password };
    registerUser(currentUser);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmitHandler}>
        <Logo />
        <h3>Register</h3>
        {showAlert && <Alert />}
        {/*Name input.*/}
        <FormRow
          type="text"
          name="name"
          value={values.name}
          onChange={onChangeHandler}
        />
        {/*Email input.*/}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={onChangeHandler}
        />
        {/*Password input.*/}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          onChange={onChangeHandler}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          Already registered?{' '}
          <Link to="/login" className="btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
