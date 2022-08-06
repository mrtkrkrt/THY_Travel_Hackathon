import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import "../style/Havadurumu.css";

export default function HavaDurumu() {
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();

  const getData = async (lat, lng) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang = navigator.language.split("-")[0];
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric&lang=${lang}`
      );
      setWeather(data);
    } catch {
      alert("Veri alinirken hata olustu");
    }
  };
  console.log(weather);

  useEffect(() => {
    latitude && longitude && getData(latitude, longitude);
  }, [latitude, longitude]);
  if (!weather) {
    return <p>Tarayıcınızdan Konum Erişimi İzni Verilmedi...</p>;
  }
  return (
    <div
      className="weather
    "
    >
      <p className="">{weather.name.toUpperCase()}</p>
      <p
        className="
      "
      >
        {weather.main.temp} °C
      </p>
      <p className="">
        {weather.weather
          .map((data) => data.description)
          .join(", ")
          .toUpperCase()}
      </p>
    </div>
  );
}
