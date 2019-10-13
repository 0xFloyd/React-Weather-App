import React from "react";
import "./index.css";

class LocationForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.locationSubmit}>
        <input
          type="text"
          placeholder="location"
          name="location"
        ></input>
        <button>Search</button>
      </form>
    );
  }
}

export default LocationForm;