import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar";
import { addHours } from "date-fns";
import { localizer, getMessagesEs } from "../../helpers";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
export const CalendarPage = () => {
  const { onToggleModel } = useUiStore();
  const { user } = useAuthStore();
  const { events, SetActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelect) => {
    const isMyEvent = user.uid === event.user;
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "green",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    onToggleModel();
  };
  const onSelect = (event) => {
    SetActiveEvent(event);
  };
  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          startAccessor="start"
          defaultView={lastView}
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
          messages={getMessagesEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
        />
      </div>
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
