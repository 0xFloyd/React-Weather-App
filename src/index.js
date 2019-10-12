import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: "",
        };
    }

    locationSubmit(location) {
        const weather = "api.openweathermap.org/data/2.5/forecast?id=524901&APPID=43e3cf2994ee866c7c768f22aed0d170";
    }

    render() {
        return (
            <div className="container">
                <h1>Weather App</h1>
            </div>
        );
    }
}



ReactDOM.render(
    <WeatherApp />,       // name of component !!!!!!!!!!!!!!!!!!!!!!!!!!
    document.getElementById('root')
);
