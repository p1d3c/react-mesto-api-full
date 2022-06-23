import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    })
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input id="name-input" type="text" className="popup__input popup__input_type_name" value={name || ''} onChange={handleNameChange} name="name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input id="job-input" type="text" className="popup__input popup__input_type_job" value={description || ''} onChange={handleDescChange} name="desc" placeholder="Описание" minLength="2" maxLength="200" required />
        <span className="popup__input-error job-input-error"></span>
      </label>
      <button type="submit" className="popup__submit" name={`edit-submit`}>Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
