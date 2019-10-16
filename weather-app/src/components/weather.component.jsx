import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import WeatherList from "./weather-list.component";
import "./styling/style.css";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      mainTemp: "",
      minTemp: "",
      maxTemp: "",
      weatherType: "",
      weatherArray: [],
      icon: ""
    };
  }
  weatherIcons = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Snow: "wi-snow",
    Rain: "wi-storm-showers",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcons.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcons.Clouds });
        break;
    }
  }

  minMaxTemp = (min, max) => {
    return (
      <h5>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h5>
    );
  };

  setSelectedPlace = place => {
    if (place) {
      this.getWeather(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    }
  };

  getWeather = async (lat, lon) => {
    const weatherCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
    );

    const weatherArrayCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
    );
    const weatherArray = await weatherArrayCall.json();
    const response = await weatherCall.json();
    this.setState({
      city: response.name,
      mainTemp: response.main.temp,
      minTemp: response.main.temp_min,
      maxTemp: response.main.temp_min,
      weatherType: response.weather[0].main,
      weatherArray: weatherArray
    });

    this.getWeatherIcon(this.weatherIcons, response.weather[0].id);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <Autocomplete
                  id="google"
                  placeholder="Please enter a location..."
                  className="form-control"
                  style={{ width: "100%" }}
                  onPlaceSelected={place => this.setSelectedPlace(place)}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "us" }}
                />
              </div>
            </div>
          </form>
        </div>
        {(this.state.city &&
          this.state.mainTemp &&
          this.state.minTemp &&
          this.state.maxTemp &&
          this.state.weatherType && (
            <React.Fragment>
              <div className="cards">
                <h1>{this.state.city}</h1>
                <h5 className="py-4">
                  <i className={`wi ${this.state.icon} display-1`}></i>
                </h5>
                <h1 className="py-2">{this.state.mainTemp}&deg;</h1>
                {this.minMaxTemp(this.state.maxTemp, this.state.minTemp)}
                <h4 className="py-3">{this.state.weatherType}</h4>
              </div>
              <WeatherList
                weather={this.state}
                minMaxTemp={this.minMaxTemp}
                list={this.state.weatherArray}
                getWeatherIcons={this.getWeatherIcons}
              ></WeatherList>
            </React.Fragment>
          )) || (
          <div>
            <br />
            <h1 style={{ color: "white" }}>No Location has been entered.</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Weather;
