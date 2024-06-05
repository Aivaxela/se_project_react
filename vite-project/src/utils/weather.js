export const getWeather = ({ lat, lon }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  console.log(data);
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp, C: 999 };
  result.type = getWeatherType(result.temp.F);
  result.weather = data.weather[0].main;

  return result;
};

const getWeatherType = (temp) => {
  if (temp > 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
};