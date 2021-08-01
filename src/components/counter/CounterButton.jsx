import React, { Component } from 'react';
import './Counter.css';
import PropTypes from 'prop-types';

class CounterButton extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    render() {
        return (
            <div className="counterButton">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
                {/* <span className="count">{this.state.counter}</span> */}
            </div>
        )
    }

    //increment = () => {
    increment() {
        //console.log('Increment');
        //this.state.counter++;
        // this.setState({
        //     counter: this.state.counter + this.props.by
        // });
        this.props.incrementMethod(this.props.by);
    }

    decrement() {
        this.setState({
            counter: this.state.counter - this.props.by
        });
        this.props.decrementMethod(this.props.by);
    }
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default CounterButton;