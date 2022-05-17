import React from 'react'
import './styles.css';

const Button = ({ colorButton, onClickButton, text }) => {
  return (
    <button className={`${colorButton === "violet" ? "violet" : "gray"} button`} onClick={onClickButton}>{text}</button>
  )
}

export default Button