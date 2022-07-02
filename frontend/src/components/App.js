import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipErrorMessage, setInfoTooltipErrorMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedUserData, setLoggedUserData] = React.useState({});
  const history = useHistory();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (localStorage.getItem('jwt')) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedUserData({
              _id: res.data._id,
              email: res.data.email
            })
            setLoggedIn(true);
            history.replace('/home');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleCardLike(card, isLiked) {
    api.changeLikeCardStatus({
      cardId: card._id,
      isLiked: !isLiked
    })
      .then((data) => {
        const { newCard } = data;
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.delCard({ cardId: card._id })
      .then(() => {
        setCards((cards) => cards.filter(с => с._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then((res) => {
        const { name, about } = res.data;
        setCurrentUser({
          ...currentUser,
          name: name,
          about: about
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ avatarPopupInputValue: avatar })
      .then((res) => {
        const { avatar } = res.data;
        setCurrentUser({
          ...currentUser,
          avatar: avatar
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlace({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogin(inputValues, setInputValues) {
    auth.authorize(inputValues.email, inputValues.password)
    .then((data) => {
      setInfoTooltipErrorMessage(`${data.message}`);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .then((res) => {
      if (!res) {
        setIsError(true);
        setIsInfoTooltipOpen(true);
        return
      }
      setLoggedUserData({
        email: inputValues.email
      })
      setInputValues({
        email: '',
        password: ''
      })
      setLoggedIn(true);
      history.replace('/home');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleRegister(inputValues, setInputValues) {
    auth.register(inputValues.email, inputValues.password)
    .then((res) => {
      if (res) {
        setIsError(false);
        setIsInfoTooltipOpen(true);
        history.replace('/signin');
      } else {
        setIsError(true);
        setIsInfoTooltipOpen(true);
        setInputValues({
          email: '',
          password: ''
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.replace('/signin');
    setLoggedIn(false);
    setLoggedUserData({});
    setCurrentUser({});
  }

  useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      return
    }
    api.getInitialCards()
      .then((res) => {
        setCards(res.data.reverse())
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])

  useEffect(() => {
    if (!loggedIn) {
      return
    }
    api.getUserInfo()
      .then((res) => {
        const { name, about, avatar, _id } = res.data;
        setCurrentUser({
          ...currentUser,
          name: name,
          about: about,
          avatar: avatar,
          id: _id,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
        loggedIn={loggedIn}
        userData={loggedUserData}
        handleSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            path="/home"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/signup">
            <section className="auth">
              <Register
              setIsInfoTooltipOpen={setIsInfoTooltipOpen}
              setIsError={setIsError}
              handleRegister={handleRegister} />
            </section>
          </Route>
          <Route path="/signin">
            <section className="auth">
              <Login
              handleLogin={handleLogin}
              />
            </section>
          </Route>
          <Route>
            {
              loggedIn ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/signin" />
              )
            }
          </Route>
        </Switch>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm name="del-confirm" title="Вы уверены?" onClose={closeAllPopups}>
          <button type="submit" className="popup__submit" name="del-confirm-submit">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isError={isError}
        infoTooltipErrorMessage={infoTooltipErrorMessage}
        />

        <Footer loggedIn={loggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
