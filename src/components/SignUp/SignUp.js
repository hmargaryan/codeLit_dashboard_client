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
        <Input type="text" label="Имя" id="name" className={styles.input} />
        <Input
          type="text"
          label="Фамилия"
          id="surname"
          className={styles.input}
        />
        <Input
          type="email"
          label="Почта"
          id="email"
          className={styles.inputWithBorder}
        />
        <Input type="text" label="Логин" id="login" className={styles.input} />
        <Input
          type="password"
          label="Пароль"
          id="firstPassword"
          className={styles.input}
        />
        <Input
          type="password"
          label="Пароль"
          id="secondPassword"
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
        Уже есть аккаунт?&nbsp;
        <Link to="/sign-in" className={styles.singInLink}>
          Войдите
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
