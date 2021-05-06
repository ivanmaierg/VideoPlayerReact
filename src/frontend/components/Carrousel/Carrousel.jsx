import React from 'react';
import '../../assets/styles/Categories.scss';

const Carrousel = ({ children }) => {
  return (
    <>
      <section className='carousel'>
        <div className='carousel__container'>
          {children}
        </div>
      </section>
    </>
  );
};

export default Carrousel;
