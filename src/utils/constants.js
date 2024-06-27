export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export const coords = {
  lat: 41.173511,
  lon: -81.442964,
};

export const APIkey = "7c93fb5f777e89aa7c9dde871f2e1ee6";

export const weatherCardImages = [
  {
    name: "clear",
    day: true,
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    name: "clouds",
    day: true,
    url: new URL("../assets/day/clouds.png", import.meta.url).href,
  },
  {
    name: "rain",
    day: true,
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    name: "storm",
    day: true,
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },
  {
    name: "snow",
    day: true,
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    name: "fog",
    day: true,
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    name: "clear",
    day: false,
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    name: "clouds",
    day: false,
    url: new URL("../assets/night/clouds.png", import.meta.url).href,
  },
  {
    name: "rain",
    day: false,
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
  {
    name: "storm",
    day: false,
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
  {
    name: "snow",
    day: false,
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },
  {
    name: "fog",
    day: false,
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },
];
