import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import '../../assets/styles/LoginForm.scss';
// eslint-disable-next-line import/no-unresolved
import twitterIcon from '@images/twitter-icon.webp';
// eslint-disable-next-line import/no-unresolved
import googleIcon from '@images/google-icon.webp';
import { Link, withRouter } from 'react-router-dom';
import { loginRequest } from '../../actions/index';

const LoginForm = (props) => {
  const [formValues, setFormValues] = useState({ email: '', password: '', remember: '' });
  const [isChecked, setIsChecked] = useState(false);
  const handleInputOnChange = (e) => {
    setFormValues({ ...formValues, remember: isChecked, [e.target.name]: e.target.value });
  };
  console.log(formValues);
  const { history } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginRequest(formValues);
    history.push('/');
  };

  return (
    <section className='login'>
      <section className='login__container'>
        <h2>Inicia Sesión</h2>
        <form className='login__container--form' onSubmit={handleSubmit}>
          <input className='input' name='email' placeholder='Correo' type='email' onChange={handleInputOnChange} />
          <input className='input' name='password' placeholder='Contraseña' type='password' onChange={handleInputOnChange} />
          <button type='submit' className='button'>Iniciar sesión</button>
          <div className='login__container--remember-me'>
            <label htmlFor='cbox1' className='container--checkbox'>
              <input type='checkbox' name='remember-me' id='cbox1' onClick={(e) => { setIsChecked([!isChecked]); }} />
              <span className='checkmark' />
              {' '}
              Recuérdame
            </label>
            <a href='/' className=''>
              {' '}
              Olvidé mi contraseña
            </a>
          </div>
        </form>
        <section className='login__container--social-media'>
          <div>
            <img src={googleIcon} alt='Google' />
            Iniciar sesión con Google
          </div>
          <div>
            <img src={twitterIcon} alt='Google' />
            Iniciar sesión con Twitter
          </div>
        </section>
        <p className='login__container--register'>
          No tienes niguna cuenta ?
          {' '}
          <Link to='/register' className='login__change-status-button'>Regístrate</Link>
        </p>
      </section>
    </section>
  );
};
const mapDispatchToProps = {
  loginRequest,
};
export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
