import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import styles from './App.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <main role="main" className={styles.wrapper}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
