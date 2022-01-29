import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form}>
        <Input type="text" label="Имя" className={styles.input} />
        <Input type="text" label="Фамилия" className={styles.input} />
        <Input type="email" label="Почта" className={styles.inputWithBorder} />
        <Input type="text" label="Логин" className={styles.input} />
        <Input type="password" label="Пароль" className={styles.input} />
        <Input
          type="password"
          label="Пароль"
          className={styles.inputWithBorder}
        />
        <Button
          type="submit"
          text="Зарегистрироваться"
          buttonStyle="primary"
          className={styles.submitButton}
        />
      </form>
      <p>
        Уже есть аккаунт?{" "}
        <Link to="/sign-in" className={styles.singInLink}>
          Войдите
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
