import { addHours, differenceInSeconds } from "date-fns";
import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import DataPicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "./styles/modal.css";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { onToggleDateModal } from "../../store";
import { useCalendarStore, useUiStore } from "../../hooks";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
registerLocale("es", es);

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen, onToggleModel } = useUiStore();
  const [formSubmited, setFormSubmited] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleMemo = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.length === 0 && "is-invalid";
  }, [formValues.title, formSubmited]);
  const onCloseModal = () => {
    console.log("cerrando Modal");
    onToggleModel();
  };

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onDateChange = (e, changing) => {
    setFormValues({
      ...formValues,
      [changing]: e,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }
    if (formValues.title.length <= 0) return;
    await startSavingEvent(formValues);
    onToggleModel();
    setFormSubmited(false);
  };
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form mb-2">
          <label>Fecha y hora inicio</label>
          <DataPicker
            locale={"es"}
            selected={formValues.start}
            className="form-control"
            onChange={(e) => onDateChange(e, "start")}
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DataPicker
            locale={"es"}
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(e) => onDateChange(e, "end")}
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleMemo}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
            value={formValues.title}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
