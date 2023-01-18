import { useDispatch, useSelector } from "react-redux";
import { onToggleDateModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const onToggleModel = () => {
    dispatch(onToggleDateModal());
  };

  return {
    isDateModalOpen,
    //methods
    onToggleModel,
  };
};
