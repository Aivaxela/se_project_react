export const getWeather = ({ lat, lon }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
  ).then((res) => checkResponse(res));
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp, C: 999 };
  result.type = getWeatherType(result.temp.F);
  result.weather = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys);
  return result;
};

const isDay = ({ sunrise, sunset }) => {
  const now = Date.now() / 1000;
  return now > sunrise && now < sunset;
};

const getWeatherType = (temp) => {
  if (temp > 80) {
    return "hot";
  } else if (temp >= 60 && temp < 80) {
    return "warm";
  } else if (temp >= 45 && temp < 60) {
    return "chilly";
  } else {
    return "cold";
  }
};
