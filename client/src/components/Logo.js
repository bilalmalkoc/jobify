import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <Link to="/landing">
      <img src={logo} className="logo" alt="jobify" />
    </Link>
  );
};

export default Logo;
