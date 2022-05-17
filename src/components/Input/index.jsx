import React from 'react';
import './styles.css';

const Input = ({ label, inputType="text", placeholder, valueInput, onChangeInput }) => {
  return (
    <div className="input-container">
        <label>{label}</label>
        <input type={inputType} placeholder={placeholder} value={valueInput} onChange={onChangeInput} />
    </div>
  )
}

export default Input