import React from 'react';
import errorImg from '../images/error.svg';
import successImg from '../images/success.svg';

function InfoTooltip(props) {
  const imgSrc = props.isError ? errorImg : successImg;

  return (
    <section className={`infotooltip ${props.isOpen ? `infotooltip_opened` : ''}`}>
      <div className="infotooltip__overlay" onClick={props.onClose}></div>
      <div className="infotooltip__inner">
        <button className="infotooltip__close-btn" type="button" name="infotooltip-close" onClick={props.onClose}></button>
        <img
        className={`infotooltip__img`}
        src={imgSrc}
        alt={props.isError ? 'error' : 'success'} />
        <h2 className="infotooltip__title">{props.isError ? `${props.infoTooltipErrorMessage}` : 'Вы успешно зарегистрировались!'}</h2>
      </div>
    </section>
  )
}

export default InfoTooltip;
