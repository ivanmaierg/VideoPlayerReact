/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-tabs */
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/ErrorNotFound.scss';

const Error = () => {
  return (
    <div className='container'>

      <h1>404</h1>
      <h2>UH OH! You're lost.</h2>
      <p>
        The page you are looking for does not exist.
        How you got here is a mystery. But you can click the button below
        to go back to the homepage.
      </p>
      <Link to='/' className='btn button link'>HOME</Link>

    </div>
  );
};

export default Error;
