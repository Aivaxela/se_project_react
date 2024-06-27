export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getClothingItems() {
    return fetch(`${this._baseUrl}/items`).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addClothingItem(item) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: item._id,
        name: item.name,
        weather: item.weather,
        imageUrl: item.imageUrl,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteClothingItem(itemId) {
    return fetch(`${this._baseUrl}/items/${itemId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
