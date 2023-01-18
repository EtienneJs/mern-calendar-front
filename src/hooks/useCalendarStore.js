import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEvents } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
// import { onToggleDateModal } from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const SetActiveEvent = (calendar) => {
    dispatch(onSetActiveEvent(calendar));
  };
  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent._id) {
        await calendarApi.put(`/event/${calendarEvent._id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post("/event", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event._id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/event/");
      const eventos = convertEvents(data.events);
      dispatch(onLoadEvents(eventos));
    } catch (error) {
      console.log("Error events");
    }
  };
  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/event/${activeEvent._id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log("error al eliminar");
      Swal.fire("No autorizado", "", "error");
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //methods
    startDeleteEvent,
    SetActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  };
};
