import React from "react";
//import { Button } from "reactstrap"; //  Reactstrap
import LocationForm from "./form";
import Clock from "./clock";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import thermometer from "./img/thermom.png";
import moment from 'moment';

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
      const openWeatherAPI = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&cnt=7&units=imperial&APPID=${apiKey}`,{ mode: "cors" }); //,{ mode: "cors" }
        const response = await openWeatherAPI.json();
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

    try { 
      const openWeather5Day = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&APPID=${apiKey}`, { mode: "cors" });
      const forecastResponse = await openWeather5Day.json();
      //console.log(forecastResponse); 
      let responseForecastList = forecastResponse.list;
      //console.log(responseForecastList.length);

      
      for (let i = 0; i < responseForecastList.length; i++) {
        console.log((moment.unix(responseForecastList[i].dt).format('H:mm:ss')));
      }
      //let firstForecast = moment.unix(forecastResponse.list[0].dt).format('H:mm:ss');
      //console.log(firstForecast);
      //console.log(moment().endOf('day').format('H:mm:ss'));
      
      //let endOfToday = moment().endOf('day').format('h:mm:ss A');
      //let timeUntilEndOfDay = moment.subtract(firstForecast, endOfToday);
      //console.log(timeUntilEndOfDay);
      
      
    } catch (error) {
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
        <Clock />
        <h1 className="weatherAppTitle">Weather App</h1>
        <LocationForm locationSubmit={this.locationSubmit}></LocationForm>
        <p id="locationStatus">{this.state.location}</p>
        <p>{this.state.weatherConditions}</p>
        <img id="weatherIcon" src={this.state.icon} alt="Weather icon"></img>
      </div>
    );
  }
}

export default App;