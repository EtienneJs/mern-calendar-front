import { createSlice } from "@reduxjs/toolkit";
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoading: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onLoadEvents: (state, { payload }) => {
      state.isLoading = false;
      // state.events = payload;
      payload.forEach((event) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === event._id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
