/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import '../assets/styles/Player.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions/index';
import arrow from '../assets/images/flecha-izquierda.png';
// import max from '../assets/images/maximizar.png';

const Player = ({ history, match, playing, getVideoSource }) => {
  const { id } = match.params;
  console.log(playing);
  const hasPlaying = playing ? Object.keys(playing).length > 0 : false;
  useEffect(() => {
    getVideoSource(id);
    console.log(playing);
    return () => {
      console.log(playing);
    };
  }, []);
  return hasPlaying ? (

    <main className='container__movie'>
      <button to='/' className='player-back' type='button' onClick={() => history.goBack()}>
        <img className='player-back__img' src={arrow} alt='return-home' />
      </button>
      <video controls className='movie'>
        <source src={playing.source} type='video/mp4' />
      </video>
      {/* <div className='controls'>
          <button type='submit' className='btn ml-1 mr-1' id='playButton'>Play/Pause</button>
          {' '}
          <button type='submit' className='btn' id='muteButton'>Mute</button>
          <div className='progress'>
            <progress id='progress' className='progress-bar' value='1' max='100'>
              <span id='progress-bar' />
            </progress>
            <button type='button' className='btn progress__btn--max'><img src={max} alt='full-screen' /></button>
          </div>
        </div> */}
    </main>
  ) : <Redirect to='/error' />;
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
