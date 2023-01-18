import { addHours } from "date-fns";
import React from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import "./styles/modal.css";

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  const handleClick = () => {
    startDeleteEvent();
  };
  return (
    <>
      <button
        style={{ display: hasEventSelected ? "" : "none" }}
        className="btn btn-outline-danger fab-danger"
        onClick={handleClick}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </>
  );
};
