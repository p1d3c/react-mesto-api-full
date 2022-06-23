import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleRegister(inputValues, setInputValues);
  }

  return (
    <>
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__form-set">
          <label className="auth__form-field">
            <input id="email-input" type="text" className="auth__input auth__input_type_email" value={inputValues.email} onChange={handleChange} name="email" placeholder="Email" minLength="2" maxLength="40" required />
            <span className="auth__input-error email-input-error"></span>
          </label>
          <label className="auth__form-field">
            <input id="password-input" type="password" className="auth__input auth__input_type_password" value={inputValues.password} onChange={handleChange} name="password" placeholder="Пароль" minLength="2" maxLength="200" required />
            <span className="auth__input-error password-input-error"></span>
          </label>
          <button type="submit" className="auth__submit" name={`auth-submit`}>Зарегистрироваться</button>
        </fieldset>
      </form>
      <p className="auth__login">Уже зарегистрированы? <Link className="auth__login-btn" to="/sign-in">Войти</Link></p>
    </>
  )
}

export default Register;
