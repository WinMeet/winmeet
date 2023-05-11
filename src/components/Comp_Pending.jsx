import React, { useRef, useEffect, useState } from "react";
import "my.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import AuthenticatedNavbar from "components/AuthenticatedNavbar";
import { Accordion, AccordionTab } from "primereact/accordion";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "primereact/dialog";

import { Toast } from "primereact/toast";

import { CreateMeetingRequestModel } from "data/models/create_meeting/create_meeting_request_model";
import { createMeeting } from "data/api/api";
import { getToken } from "utils/token_manager";
import jwt_decode from "jwt-decode";

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const localizer = momentLocalizer(moment);

const CompPending = () => {
  const [events, setEvents] = useState([]); // State variable to hold the fetched events

  useEffect(() => {
    const token = getToken();
    const decoded = jwt_decode(token);
    const data = { eventOwner: decoded.email };

    fetch("http://localhost:3002/createMeeting/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("buarada oalcak yarral");
        console.log(data);
        console.log(data.combined);
        const fetchedEvents = data.combined.map((item) => {
          if (item.isPending === true) {
            return {
              id: item._id,
              title: item.eventName,
              description: item.eventDescription,
              location: item.location,
              allDay: false,
              start: new Date(item.eventStartDate),
              end: new Date(item.eventEndDate),
              participant: item.participants,
            };
          }
          return null; // Exclude the event if pending is 1
        });
        setEvents(fetchedEvents.filter((event) => event !== null));
      })
      .catch((error) => console.error(error));
  }, []);

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button label="Vote" icon="pi pi-check" />
    </div>
  );

  return (
    <>
      <div className="grid">
        <div className="col-10 col-offset-1">
          <AuthenticatedNavbar></AuthenticatedNavbar>
          {/* accordion starts */}
          <div className="card">
            <Accordion multiple activeIndex={[0]}>
              <AccordionTab header="Header I">
                {/* Event vote starts */}
                <div className="grid">
                  {/* Map over the events and render Card components */}
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="card flex col-4 col_offset-1 justify-content-center"
                    >
                      <Card
                        title={event.title}
                        subTitle={event.description}
                        footer={footer}
                        className="md:w-25rem"
                      >
                        <p className="m-0">{event.location}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};
export default CompPending;