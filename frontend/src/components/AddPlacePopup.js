import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link
    })
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen])

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
      <label className="popup__form-field">
        <input id="title-input" type="text" className="popup__input popup__input_type_title" value={title || ''} onChange={handleTitleChange} name="name" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input id="url-input" type="url" className="popup__input popup__input_type_image" value={link || ''} onChange={handleLinkChange} name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error url-input-error"></span>
      </label>
      <button type="submit" className="popup__submit" name="add-submit">Создать</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
