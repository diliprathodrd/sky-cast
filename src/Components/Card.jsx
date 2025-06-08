import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div className='card'>
      <p className='title'>{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default Card;
