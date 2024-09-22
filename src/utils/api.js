export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getCurrentUser = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  };

  updateCurrentUser = (newData, token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newData.username,
        avatar: newData.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  };

  getClothingItems() {
    return fetch(`${this._baseUrl}/items`).then((res) =>
      this._checkResponse(res)
    );
  }

  addClothingItem(item, token) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: item._id,
        name: item.name,
        weather: item.weather,
        imageUrl: item.imageUrl,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteClothingItem(itemId, token) {
    return fetch(`${this._baseUrl}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  addCardLike(cardId, token) {
    return fetch(`${this._baseUrl}/items/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  deleteCardLike(cardId, token) {
    return fetch(`${this._baseUrl}/items/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((err) => {
      return Promise.reject(`Error: ${res.status} - ${err.message}`);
    });
  }
}
