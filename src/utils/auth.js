export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrmarcum.crabdance.com"
    : "http://localhost:3001";
import { checkResponse } from "../utils/weather.js";

export const register = ({ username, password, email, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, password, email, avatar }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};
