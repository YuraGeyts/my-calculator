import React from 'react';
import './Button.css';

const Button = ({ label, onClick, type }) => {
  return (
    <button
      className={`btn ${type === 'operator' ? 'btn-operator' : ''} ${type === 'control' ? 'btn-clear' : ''} ${type === 'zero' ? 'btn-zero' : ''}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Button;
