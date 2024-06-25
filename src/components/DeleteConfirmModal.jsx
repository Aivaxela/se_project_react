import close from "../assets/close.svg";

function DeleteConfirmModal({ isOpen, onModalClose, onDeleteClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__confirm-delete-container">
        <button className="modal__close" type="button" onClick={onModalClose}>
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
            onClick={onModalClose}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
