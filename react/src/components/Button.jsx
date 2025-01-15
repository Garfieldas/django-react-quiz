import React from 'react'
import { useNavigate } from 'react-router-dom';

const Button = ({buttonText, onClick, className}) => {
    const navigate = useNavigate();
  return (
    <button
    onClick={onClick}
    className={className}
    >
        {buttonText}</button>
  )
}

export default Button