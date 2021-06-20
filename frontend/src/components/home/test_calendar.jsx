import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


class TestCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date()};
    this.onChange = this.onChange.bind(this)
  }

  onChange = (value) => this.setState({ value: value});
  
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={new Date(this.state.value)}
          maxDate={new Date()}
        />
      </div>
    );
  }
}
export default TestCalendar