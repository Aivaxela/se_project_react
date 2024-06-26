const baseUrl = "http://localhost:3001";

export function getClothingItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}
