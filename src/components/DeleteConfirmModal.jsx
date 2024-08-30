import { useContext } from "react";
import close from "../assets/close.svg";
import { AppContext } from "../contexts/AppContext";

function DeleteConfirmModal({ isOpen, onDeleteClick }) {
  const { setActiveModal } = useContext(AppContext);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__confirm-delete-container">
        <button
          className="modal__close"
          type="button"
          onClick={() => setActiveModal("")}
        >
          <img src={close} alt="close button" className="modal__close-icon" />
        </button>
        <div className="modal__text-section">
          <p className="modal__subtext">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__subtext">This action is irreversible.</p>
        </div>
        <div className="modal__text-section">
          <p
            className="modal__subtext modal__confirm-delete-text modal__el_hovered"
            onClick={onDeleteClick}
          >
            Yes, delete item
          </p>
          <p
            className="modal__subtext modal__el_hovered"
            onClick={() => setActiveModal("")}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
