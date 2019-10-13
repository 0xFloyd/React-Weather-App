import React from "react";
//import { Button } from "reactstrap"; //  Reactstrap
import LocationForm from "./form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import thermometer from "./img/thermom.png";

//  TODO  add geolocation   npmjs.com/package/react-geolocated


const apiKey = "43e3cf2994ee866c7c768f22aed0d170";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Search a city to find the current weather!",
      weatherConditions: "",
      icon: thermometer
    };

    //this.locationSubmit = this.locationSubmit.bind(this);
  }

 

  locationSubmit = async (e) => {
    let location = e.target.elements.location.value;
    e.preventDefault();
    try {
      const openWeatherAPI = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${apiKey}`,{ mode: "cors" }); //,{ mode: "cors" }
        const response = await openWeatherAPI.json();
        console.log(response);

        let icon = response.weather[0].icon;
        let iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
        let temperature = Math.round(response.main["temp"]) + "°F";
        location = response.name + ", " + response.sys["country"];

        this.setState({
            location: location,
          weatherConditions: temperature + ", " + response.weather[0].main,
            icon: iconURL
        });
    }   catch (error) {
        this.setState({
          location: "",
          weatherConditions: "We can't find that city. Please try again.",
          icon: ""
        });
    }
  }
  
  render() {
    return (
      <div className="container">
        <h1>Weather App</h1>
        <LocationForm locationSubmit={this.locationSubmit}></LocationForm>
        <p id="locationStatus">{this.state.location}</p>
        <p>{this.state.weatherConditions}</p>
        <img id="weatherIcon" src={this.state.icon} alt="Weather icon"></img>
      </div>
    );
  }
}

export default App;