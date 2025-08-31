// WeatherIcon.jsx
import React from "react";
// import "./WeatherIcons.scss"; // your CSS/SCSS file for styling

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case "Clear":
      return (
        <div className="hot div">
          <span className="sun"></span>
          <span className="sunx"></span>
        </div>
      );

    case "Clouds":
      return (
        <div className="cloudy div">
          <span className="cloud"></span>
          <span className="cloudx"></span>
        </div>
      );

    case "Thunderstorm":
      return (
        <div className="stormy div">
          <ul>
            {Array.from({ length: 8 }).map((_, i) => <li key={i}></li>)}
          </ul>
          <span className="snowe"></span>
          <span className="snowex"></span>
          <span className="stick"></span>
          <span className="stick2"></span>
        </div>
      );

    case "Wind":
    case "Breeze":
      return (
        <div className="breezy div">
          <ul>
            {Array.from({ length: 5 }).map((_, i) => <li key={i}></li>)}
          </ul>
          <span className="cloudr"></span>
        </div>
      );

    case "Night":
      return (
        <div className="night div">
          <span className="moon"></span>
          <span className="spot1"></span>
          <span className="spot2"></span>
          <ul>
            {Array.from({ length: 5 }).map((_, i) => <li key={i}></li>)}
          </ul>
        </div>
      );

    default:
      return (
        <div className="cloudy div">
          <span className="cloud"></span>
          <span className="cloudx"></span>
        </div>
      );
  }
};

export default WeatherIcon;
