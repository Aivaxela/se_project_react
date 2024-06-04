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
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
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
    name: "sunny",
    link: "/src/assets/sunny.png",
  },
  {
    name: "cloudy",
    link: "/src/assets/cloudy.png",
  },
  {
    name: "rain",
    link: "/src/assets/rain.png",
  },
  {
    name: "storm",
    link: "/src/assets/storm.png",
  },
  {
    name: "snow",
    link: "/src/assets/snow.png",
  },
  {
    name: "fog",
    link: "/src/assets/fog.png",
  },
  {
    name: "sunnyNight",
    link: "/src/assets/sunny_night.png",
  },
  {
    name: "cloudyNight",
    link: "/src/assets/cloudy_night.png",
  },
  {
    name: "rainNight",
    link: "/src/assets/rain_night.png",
  },
  {
    name: "stormNight",
    link: "/src/assets/storm_night.png",
  },
  {
    name: "snowNight",
    link: "/src/assets/snow_night.png",
  },
  {
    name: "fogNight",
    link: "/src/assets/fog_night.png",
  },
];
