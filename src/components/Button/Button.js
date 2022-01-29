import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

const Button = ({ type, text, buttonStyle, className }) => {
  return (
    <button type={type} className={classNames(styles.root, styles[buttonStyle], className)}>{text}</button>
  );
};

export default Button;
