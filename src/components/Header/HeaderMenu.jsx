/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/styles/HeaderMenu.scss';
import profileImg from '@images/user.png';
import gravatar from '../../utils/gravatar';
import { logoutRequest } from '../../actions/index';

const HeaderMenu = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;
  const handleLogout = () => {
    props.logoutRequest({});
  };
  return (
    <div className='header__menu'>
      <div className='header__menu--profile'>
        {(hasUser) ? <img src={gravatar(user.email)} alt={user.email} /> : <img src={profileImg} alt='user' className='invert' /> }

        <ul>
          {hasUser ? <li><a href='/'>{user.name}</a></li> : null}
          {hasUser ? <li><a href='#logout' onClick={handleLogout}>Cerrar Sesión</a></li> : <li><a href='/login'>Iniciar Sesión</a></li> }
          <li><a href='&'>Salir</a></li>
        </ul>
      </div>
    </div>
  );
};
HeaderMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logoutRequest: PropTypes.any.isRequired,

};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
