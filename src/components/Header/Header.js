import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import logo from '../../assets/logo.png';
import user from '../../assets/user.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.root}>
      <img src={logo} alt="Логотип" width={48} height={48} className={styles.logo} />
      <nav className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink to="/" className={({ isActive }) => classNames(styles.menuLink, { [styles.menuLinkActive]: isActive })}>Дашборд</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/candidates" className={({ isActive }) => classNames(styles.menuLink, { [styles.menuLinkActive]: isActive })}>Кандидаты</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/samples" className={({ isActive }) => classNames(styles.menuLink, { [styles.menuLinkActive]: isActive })}>Шаблоны</NavLink>
        </li>
      </nav>
      <nav className={styles.userMenu}>
        <Button type="link" to="/create-candidate" text="+ Добавить кандидата" buttonStyle="primary" className={styles.createCandidateLink} />
        <img src={user} alt="Пользователь" width={48} height={48} />
      </nav>
    </header>
  );
};

export default Header;
