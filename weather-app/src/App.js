import React from "react";
import Weather from "./components/weather.component";
import "weathericons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_Key = "cbc486e13bbbbad1c5fe82b290403df1";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getWeather(34.0522, 34.0522);
  }

  getWeather = async (lat, lon) => {
    const weatherCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`
    );

    const response = await weatherCall.json();
    console.log(response);
  };

  render() {
    return (
      <div className="App">
        <Weather></Weather>
      </div>
    );
  }
}

export default App;
