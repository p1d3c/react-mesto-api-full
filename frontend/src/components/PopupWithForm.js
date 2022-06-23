import React from 'react';

function PopupWithForm(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__inner">
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={`${props.name}-form`} noValidate onSubmit={props.onSubmit}>
          <fieldset className="popup__form-set">
            {props.children}
            <button className="popup__close-btn" type="button" name={`${props.name}-close`} onClick={props.onClose}></button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
