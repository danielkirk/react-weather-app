import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      mainTemp: "",
      minTemp: "",
      maxTemp: "",
      weatherType: ""
    };
  }

  minMaxTemp = (min, max) => {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
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

    const response = await weatherCall.json();
    console.log(response);
    this.setState(
      {
        city: response.name,
        mainTemp: response.main.temp,
        minTemp: response.main.temp_min,
        maxTemp: response.main.temp_min,
        weatherType: response.weather[0].main
      },
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <div className="container">
        <div className="form-group">
          <Autocomplete
            style={{ width: "50%" }}
            onPlaceSelected={place => this.setSelectedPlace(place)}
            types={["(regions)"]}
            componentRestrictions={{ country: "us" }}
          />
        </div>
        {(this.state.city &&
          this.state.mainTemp &&
          this.state.minTemp &&
          this.state.maxTemp &&
          this.state.weatherType && (
            <div className="cards">
              <h1>{this.state.city}</h1>
              <h5 className="py-4">
                <i
                  className={
                    this.state.weatherType === "Clear"
                      ? "wi wi-day-sunny display-1"
                      : "wi wi-cloud display-1"
                  }
                ></i>
              </h5>
              <h1 className="py-2">{this.state.mainTemp}&deg;</h1>
              {this.minMaxTemp(this.state.maxTemp, this.state.minTemp)}
              <h4 className="py-3">{this.state.weatherType}</h4>
            </div>
          )) || <h1>Please select Location.</h1>}
      </div>
    );
  }
}

export default Weather;
