const baseUrl = "http://localhost:3001";

export const clothingItems = fetch(`${baseUrl}/items`, {
  headers: {
    "Content-Type": "application/json",
  },
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
});
