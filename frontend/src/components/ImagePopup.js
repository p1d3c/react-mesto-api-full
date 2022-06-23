import React from 'react';

function ImagePopup(props) {

  return (
    <section className={`popup popup_type_img ${props.card ? `popup_opened` : ''}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__content">
        <img className="popup__image" src={`${props.card ? props.card.link : '#'}`} alt={`${props.card ? props.card.name : '#'}`} />
        <button className="popup__close-btn" type="button" name="img-close" onClick={props.onClose}></button>
        <h2 className="popup__caption">{`${props.card ? props.card.name : ''}`}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
