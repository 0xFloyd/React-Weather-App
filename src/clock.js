import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

     // lifecycle method
    componentDidMount() {     
        this.timerID = setInterval(() => this.tick(), 1000);    //The setInterval() method calls a function at specified intervals (in milliseconds).
    }

    componentWillUnmount() {
        clearInterval(this.timerID);            //  clearInterval() method clears a timer set with the setInterval() method.
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return(
            <div className="clockContainer">
                <p className="clock">{this.state.date.toLocaleTimeString()}</p>     {/* toLocaleTimeString  returns a string with a language sensitive representation of the time portion of this date. */}
            </div>
        );
    }
}

export default Clock;