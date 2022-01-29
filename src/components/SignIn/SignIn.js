import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SignIn.module.css';

const SignIn = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form}>
        <Input type="text" label="Логин" className={styles.input} />
        <Input type="password" label="Пароль" className={styles.inputWithBorder} />
        <Button type="submit" text="Войти" buttonStyle="primary" className={styles.submitButton} />
      </form>
      <p>Нет аккаунта? <Link to='/sign-up' className={styles.singUpLink}>Зарегистрируйтесь</Link></p>
    </div >
  );
};

export default SignIn;
