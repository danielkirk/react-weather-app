import React from "react";
import Autocomplete from "react-google-autocomplete";

const Weather = () => {
  function minmaxTemp(min, max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }

  return (
    <div className="container">
      <div className="cards">
        <Autocomplete
          style={{ width: "90%" }}
          onPlaceSelected={place => {
            console.log(place.geometry.location.lat());
          }}
          types={["(regions)"]}
          componentRestrictions={{ country: "us" }}
        />
      </div>
      <div className="cards">
        <h1>Weather</h1>
        <h5 className="py-4">
          <i className="wi wi-day-sunny display-1"></i>
        </h5>
        <h1 className="py-2">25&deg;</h1>
        {minmaxTemp(24, 90)}
        <h4 className="py-3">Slow Rain</h4>
      </div>
    </div>
  );
};

export default Weather;
