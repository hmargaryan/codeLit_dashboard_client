import React from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

const Input = ({ id, type, label, className }) => {
  return (
    <div className={classNames(styles.root, className)}>
      {label && (
        <label for={id} className={styles.label}>
          {label}
        </label>
      )}
      <input type={type} id={id} name={id} className={styles.input} />
    </div>
  );
};

export default Input;
