import { createSlice } from "@reduxjs/toolkit";
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onToggleDateModal: (state) => {
      state.isDateModalOpen = !state.isDateModalOpen;
    },
  },
});
export const { onToggleDateModal } = uiSlice.actions;
