import React, { Component } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Bigcalendar extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const events = [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2023, 2, 25),
        end: new Date(2023, 2, 30),
      },
    ];
    this.state = {
      name: "React",
      events,
    };
  }

  handleSelectEvent = (event) => {
    window.alert(`You clicked on event "${event.title}"`);
  };

  render() {
    return (
      <div>
        <div style={{ height: "500pt" }}>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            onSelectEvent={this.handleSelectEvent}
          />
        </div>
      </div>
    );
  }
}

export default Bigcalendar;