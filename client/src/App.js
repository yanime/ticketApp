import React, { Component } from 'react';
import './App.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
const format = require('date-fns/format');
const Loading = require('react-loading-animation');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      tickets: [],
    };
  }
  onDaySelect = day => {
    const queryDate = format(day, 'YYYY-MM-DD');
    this.setState({ isFetching: true });
    axios
      .get(`http://0.0.0.0:5050/api/tickets/${queryDate}`)
      .then(response => {
        this.setState({ isFetching: false, tickets: response.data.tickets });
      })
      .catch(e => {
        this.setState({ isFetching: false });
        console.log(e);
      });
  };
  renderTickets = () => {
    return this.state.tickets.map((ticket, index) => {
      return (
        <div key={index}>
          {ticket.Title} - {ticket.genre}
        </div>
      );
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ticket app</h1>
        </header>
        <div style={{ marginTop: '10px' }}>
          <p>Please select the show date: </p>
          <DayPickerInput onDayChange={this.onDaySelect} />
        </div>
        <div>
          <Loading
            isLoading={this.state.isFetching && this.state.tickets.length === 0}
          >
            {this.renderTickets()}
          </Loading>
        </div>
      </div>
    );
  }
}

export default App;
