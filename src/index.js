import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';   //  Reactstrap 
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

//  TODO  add geolocation   npmjs.com/package/react-geolocated

navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude, position.coords.longitude);
});
//  https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/geocoding-reverse

ReactDOM.render(
    <App />,       // name of component !!!!!!!!!!!!!!!!!!!!!!!!!!
    document.getElementById('root')
);
