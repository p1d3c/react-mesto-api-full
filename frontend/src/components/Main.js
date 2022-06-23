import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleEditAvatarClick = props.onEditAvatar;
  const handleEditProfileClick = props.onEditProfile;
  const handleAddPlaceClick = props.onAddPlace;

  return (
    <main>
      <section className="profile">
        <img src={currentUser.avatar} alt="" className="profile__avatar" />
        <div className="profile__edit-pen" onClick={handleEditAvatarClick}></div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-btn" onClick={handleEditProfileClick} type="button" name="edit"></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={handleAddPlaceClick} type="button" name="add"></button>
      </section>

      <section className="elements">
        {
          props.cards.map((card) => {
            return (
              <Card
              cardInfo={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
            )
          })
        }
      </section>
    </main>
  );
}

export default Main;
