import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Button } from "reactstrap";    //  Reactstrap 
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

//  TODO  add geolocation   npmjs.com/package/react-geolocated




ReactDOM.render(
    <App />,       // name of component !!!!!!!!!!!!!!!!!!!!!!!!!!
    document.getElementById('root')
);
