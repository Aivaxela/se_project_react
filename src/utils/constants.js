export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export const coords = {
  lat: 41.173511,
  lon: -81.442964,
};

export const APIkey = "7c93fb5f777e89aa7c9dde871f2e1ee6";

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "chilly",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "chilly",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

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
    link: "./src/assets/day/rain.png",
  },
  {
    name: "storm",
    day: true,
    link: "./src/assets/day/storm.png",
  },
  {
    name: "snow",
    day: true,
    link: "./src/assets/day/snow.png",
  },
  {
    name: "fog",
    day: true,
    link: "./src/assets/day/fog.png",
  },
  {
    name: "clear",
    day: false,
    link: "./src/assets/night/clear.png",
  },
  {
    name: "clouds",
    day: false,
    url: new URL("../assets/night/clouds.png", import.meta.url).href,
  },
  {
    name: "rain",
    day: false,
    link: "./src/assets/night/rain.png",
  },
  {
    name: "storm",
    day: false,
    link: "./src/assets/night/storm.png",
  },
  {
    name: "snow",
    day: false,
    link: "./src/assets/night/snow.png",
  },
  {
    name: "fog",
    day: false,
    link: "./src/assets/night/fog.png",
  },
];
