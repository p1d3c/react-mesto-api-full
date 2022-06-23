import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    })
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input id="avatar-input" type="url" className="popup__input popup__input_type_avatar" ref={inputRef} name="avatar" placeholder="Ссылка" required />
        <span className="popup__input-error avatar-input-error"></span>
      </label>
      <button type="submit" className="popup__submit" name="avatar-submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
