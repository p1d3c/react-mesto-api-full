import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.cardInfo.owner === currentUser.id;
  const cardDeleteButtonClassName = (
    `element__button ${isOwn ? '' : 'element__button_hidden'}`
  )

  const isLiked = props.cardInfo.likes.some(item => item === currentUser.id);
  const cardLikeButtonClassName = (
    `element__heart ${isLiked ? 'element__heart_active' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.cardInfo);
  }

  function handleLikeClick() {
    props.onCardLike(props.cardInfo, isLiked);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardInfo);
  }

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={props.cardInfo.link} alt={props.cardInfo.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{props.cardInfo.name}</h2>
        <div className="element__likes-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" name="heart"></button>
          <span className="element__likes-count">{props.cardInfo.likes.length > 0 ? props.cardInfo.likes.length : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;
