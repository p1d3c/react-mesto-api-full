import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  const linkTo = location.pathname === '/signup' ? '/signin' : '/signup';

  function signOut() {
    props.handleSignOut();
  }

  return (
    <header className="header">
      <a href="/home" className="header__link">
        <img src={logo} alt="mesto" className="header__logo" />
      </a>
      {props.loggedIn ? (
        <div className="header__container">
          <p className="header__email">{props.userData.email}</p>
          <button className="header__quit" onClick={signOut}>Выход</button>
        </div>
      ) : (
        <Link className="header__path" to={linkTo}>
        {location.pathname === '/signup' ? 'Войти' : 'Регистрация'}
      </Link>
      )}
    </header>
  )
}

export default Header;
