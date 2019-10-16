import React from "react";

function WeatherList(props) {
  const weatherIcons = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Snow: "wi-snow",
    Rain: "wi-storm-showers",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  function getWeatherIcons(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        return weatherIcons.Thunderstorm;
      case rangeId >= 300 && rangeId <= 321:
        return weatherIcons.Drizzle;
      case rangeId >= 500 && rangeId <= 531:
        return weatherIcons.Rain;
      case rangeId >= 600 && rangeId <= 622:
        return weatherIcons.Snow;
      case rangeId >= 701 && rangeId <= 781:
        return weatherIcons.Atmosphere;
      case rangeId === 800:
        return weatherIcons.Clear;
      case rangeId >= 801 && rangeId <= 804:
        return weatherIcons.Clouds;
      default:
        return weatherIcons.Clouds;
    }
  }
  return (
    <div>
      <div className="card-deck">
        {props.list.list.map(item => {
          var icon = getWeatherIcons(weatherIcons, item.weather[0].id);
          return (
            <div className="card col-md-3">
              <div className="card-title">
                <h1>{props.list.city.name}</h1>
              </div>
              <div className="card-body">
                <h5 className="py-4">
                  <i className={`wi ${icon} display-1`}></i>
                </h5>
                <h1 className="py-2">{item.main.temp}&deg;</h1>
                {props.minMaxTemp(item.main.temp_max, item.main.temp_max)}
                <h4 className="py-3">{item.weather[0].main}</h4>
              </div>
              <div class="card-footer">
                <small class="text-muted">
                  {new Date(item.dt_txt).toLocaleString()}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherList;
