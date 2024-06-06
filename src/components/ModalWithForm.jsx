import "../blocks/Modal.css";
import close from "../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleModalClose,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={handleModalClose}
        >
          <img src={close} alt="close button" className="modal__close-icon" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
