import { token } from './utils';

class Api {
  constructor({ baseUrl, headers, renderCardsCallback, setUserInfoCallback, addNewCardCallback }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._renderCardsCallback = renderCardsCallback;
    this._setUserInfoCallback = setUserInfoCallback;
    this._addNewCardCallback = addNewCardCallback;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  delCard({ cardId }) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  changeLikeCardStatus({ cardId, isLiked }) {
    if (isLiked) {
      return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    } else {
      return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    }
  }

  changeAvatar({ avatarPopupInputValue }) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarPopupInputValue
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: token,
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

export default api;
