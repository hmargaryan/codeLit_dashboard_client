import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Button.module.css";

const Button = ({ type, to, text, buttonStyle, className }) => {
  return type === "link" ? (
    <Link to={to} className={classNames(styles.root, styles[buttonStyle], className)}>
      {text}
    </Link>
  ) : (
    <button
      type={type}
      className={classNames(styles.root, styles[buttonStyle], className)}
    >
      {text}
    </button>
  );
};

export default Button;
