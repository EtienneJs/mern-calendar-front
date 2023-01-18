import { addHours } from "date-fns";
import React from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import "./styles/modal.css";

export const FabAddNew = () => {
  const { onToggleModel } = useUiStore();
  const { SetActiveEvent } = useCalendarStore();
  const handleClick = () => {
    SetActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: 123,
        name: "fernando",
      },
    });
    onToggleModel();
  };
  return (
    <>
      <button className="btn btn-primary fab" onClick={handleClick}>
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
};
