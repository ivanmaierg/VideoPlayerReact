import React from 'react';
import '../assets/styles/Categories.scss';

const Categories = ({ children, title }) => {
  return (
    <div className='categories'>
      <h2 className='categories__title'>
        {title}
      </h2>
      <div>
        {children}
      </div>

    </div>
  );
};

export default Categories;
