import React, { Component } from "react";
import WeatherList from "./weather-list.component";
import { Label } from "semantic-ui-react";
import axios from "axios";
import "./styling/style.css";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temperature: "",
      minTemperature: "",
      maxTemperature: "",
      weatherType: "",
      weatherArray: [],
      icon: "",
      zipCode: "",
      firstIcon: "",
      isCached: false
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
        this.setState({ firstIcon: this.weatherIcons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ firstIcon: this.weatherIcons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ firstIcon: this.weatherIcons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ firstIcon: this.weatherIcons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ firstIcon: this.weatherIcons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ firstIcon: this.weatherIcons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ firstIcon: this.weatherIcons.Clouds });
        break;
      default:
        this.setState({ firstIcon: this.weatherIcons.Clouds });
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

  loadWeather = async e => {
    e.preventDefault();
    e.persist();
    const zip = e.target.elements.zipcode.value;
    await this.getWeather(zip);
  };

  setCachedData = async (zip, data) => {
    const weatherArrayCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&cnt=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
    );
    const weatherArray = await weatherArrayCall.json();
    this.setState({
      city: data.city,
      temperature: data.temperature,
      minTemperature: data.minTemperature,
      maxTemperature: data.maxTemperature,
      weatherType: data.weatherType,
      weatherArray: weatherArray,
      zipCode: data.zipCode,
      icon: data.icon,
      isCached: true
    });
    this.getWeatherIcon(this.weatherIcons, data.icon);
  };

  getWeather = async zip => {
    const cacheCall = await axios
      .get(`/api/address/zipcode/${zip}`)
      .catch(err =>
        console.log("No previous records found with that zip code")
      );

    if (cacheCall) {
      var data = cacheCall.data;
      this.setCachedData(zip, data);
      return;
    }

    const weatherCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
    );

    const weatherArrayCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&cnt=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
    );
    const weatherArray = await weatherArrayCall.json();
    const response = await weatherCall.json();
    if (response.message || weatherArray.message) {
      return alert("Please Enter valid zip code!");
    }
    this.setState(
      {
        city: response.name,
        temperature: response.main.temp,
        minTemperature: response.main.temp_min,
        maxTemperature: response.main.temp_max,
        weatherType: response.weather[0].main,
        weatherArray: weatherArray,
        zipCode: zip,
        icon: response.weather[0].id,
        isCached: false
      },
      async () => {
        await axios.post("api/address/", { ...this.state });
      }
    );

    this.getWeatherIcon(this.weatherIcons, response.weather[0].id);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form onSubmit={this.loadWeather}>
            <div className="row">
              <div className="col-md-3 offset-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Zip Code (US Only)"
                  name="zipcode"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-3 mt-md-0 text-md-left">
                <button className="btn btn-warning">Get Weather</button>
              </div>
            </div>
          </form>
        </div>
        {(this.state.city &&
          this.state.temperature &&
          this.state.minTemperature &&
          this.state.maxTemperature &&
          this.state.weatherType && (
            <React.Fragment>
              <div style={{ color: "white" }} className="cards pb-2">
                <h1>{this.state.city}</h1>
                {this.state.isCached && (
                  <Label as="a" color="teal" tag>
                    Data retrieved from cache!
                  </Label>
                )}
                <h5 className="py-4">
                  <i className={`wi ${this.state.firstIcon} display-1`}></i>
                </h5>
                <h1 className="py-2">{this.state.temperature}&deg;</h1>
                {this.minMaxTemp(
                  this.state.maxTemperature,
                  this.state.minTemperature
                )}
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
            <h1 style={{ color: "white" }}>Weather App</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Weather;
