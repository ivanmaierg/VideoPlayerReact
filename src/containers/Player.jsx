/* eslint-disable import/no-unresolved */
import React from 'react';
import '../assets/styles/Player.scss';
import { Link } from 'react-router-dom';
import arrow from '../assets/images/flecha-izquierda.png';
import max from '../assets/images/maximizar.png';

const Player = () => {
  return (
    <div className='container__screen'>
      <main className='container__movie'>
        <Link to='/' className='player-back'>
          <img className='player-back__img invert' src={arrow} alt='return-home' />
        </Link>
        <video className='movie'>
          <source src='../assets/BigBuckBunny.mp4' />
        </video>

        <div className='controls'>

          <button type='submit' className='btn ml-1 mr-1' id='playButton'>Play/Pause</button>
          {' '}
          <button type='submit' className='btn' id='muteButton'>Mute</button>
          <div className='progress'>
            <progress id='progress' className='progress-bar' value='1' max='100'>
              <span id='progress-bar' />
            </progress>
            <button type='button' className='btn progress__btn--max'><img src={max} alt='full-screen' /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Player;
