import React from "react";
import { Row, Col } from "reactstrap"; //  Reactstrap
import LocationForm from "./form";
import Clock from "./clock";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import thermometer from "./img/thermom.png";
import moment from 'moment';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { async } from "q";
//  TODO  add geolocation   npmjs.com/package/react-geolocated


const apiKey = "43e3cf2994ee866c7c768f22aed0d170";
const googleMapsAPIKey = "AIzaSyDzAFPTp0UbVyxwwuOeJwZmnaHSUo9mK_A";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Search a city to find the current weather!",
      weatherConditions: "",
      icon: thermometer,
      days: [{ date: "", temp: "" }, { date: "", temp: "" }, { date: "", temp: "" }, { date: "", temp: "" }, { date: "", temp: "" }],
      latitude: null,
      longitude: null
    };

    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    //this.locationSubmit = this.locationSubmit.bind(this);
  }

  // use callback? 10/14/19
  getLocation = async() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCoordinates, this.userLocationError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      try {
        let currentLatitude = this.state.latitude;
        let currentLongitude = this.state.longitude;
        let both = currentLatitude + "," + currentLongitude;
        console.log(both);
        const googleMApsAPI = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${both}&key=${googleMapsAPIKey}`, { mode: "cors" }); //,{ mode: "cors" }
        const response = await googleMApsAPI.json();
        console.log(response);

      } catch (error) {
        alert("error in try/catch googleapi");
      }
  }

  getCoordinates(position) {
    
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    
  }

  userLocationError(error) {
    alert(error);
  }

  locationSubmit = async (e) => {
    e.preventDefault();
    let timeNow = (new Date()).toLocaleTimeString('en-GB');
    //let endOfDay = moment().endOf('day').format('HH:mm:ss');
    let end = moment.utc(timeNow, "HH:mm");
    //let start = moment.utc(endOfDay, "HH:mm");
    //console.log(moment.utc(+d).format('H:mm'));
    let location = e.target.elements.location.value;

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
      let temporary, day1, day2, day3, day4, day5;
      const openWeather5Day = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&APPID=${apiKey}`, { mode: "cors" });
      const forecastResponse = await openWeather5Day.json();
      //console.log(forecastResponse); 
      let responseForecastList = forecastResponse.list;

      for (let i = 0; i < responseForecastList.length; i++) {
        temporary = moment.unix(responseForecastList[i].dt).format('H:mm:ss');
        temporary = moment.utc(temporary, "HH:mm");
        if (temporary.isBefore(end)) {
          day1 = { date: moment.unix(responseForecastList[i + 4].dt).format('dddd, M/D'), temp: Math.round(responseForecastList[i + 4].main["temp"]) + "°F"};
          day2 = { date: moment.unix(responseForecastList[i + 12].dt).format('dddd, M/D'), temp: Math.round(responseForecastList[i + 12].main["temp"]) + "°F" };
          day3 = { date: moment.unix(responseForecastList[i + 20].dt).format('dddd, M/D'), temp: Math.round(responseForecastList[i + 20].main["temp"]) + "°F" };
          day4 = { date: moment.unix(responseForecastList[i + 28].dt).format('dddd, M/D'), temp: Math.round(responseForecastList[i + 28].main["temp"]) + "°F" };
          day5 = { date: moment.unix(responseForecastList[i + 36].dt).format('dddd, M/D'), temp: Math.round(responseForecastList[i + 36].main["temp"]) + "°F" };
          break;
        };
        };
        
      this.setState({
        days: [day1, day2, day3, day4, day5]
      });
      
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
        <Row>
          <Col xs={12}>
            <LocationForm locationSubmit={this.locationSubmit}></LocationForm>
          </Col>
          <Col>
            <div className="locationIcon">
              <FaMapMarkerAlt size={20} onClick={this.getLocation} /><span onClick={this.getLocation}>my location</span>
            </div>
          </Col>
        </Row>
        <p id="locationStatus">{this.state.location}</p>
        <p>{this.state.weatherConditions}</p>
        <img id="weatherIcon" src={this.state.icon} alt="Weather icon"></img>
        <Row>
          <Col>
            <p>{this.state.days[0]['date']}</p>
          </Col>
          <Col>
            <p>{this.state.days[0]['temp']}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{this.state.days[1]['date']}</p>
          </Col>
          <Col>
            <p>{this.state.days[1]['temp']}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{this.state.days[2]['date']}</p>
          </Col>
          <Col>
            <p>{this.state.days[2]['temp']}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{this.state.days[3]['date']}</p>
          </Col>
          <Col>
            <p>{this.state.days[3]['temp']}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{this.state.days[4]['date']}</p>
          </Col>
          <Col>
            <p>{this.state.days[4]['temp']}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;