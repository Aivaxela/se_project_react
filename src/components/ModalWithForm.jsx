import "../blocks/Modal.css";
import close from "../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onModalClose,
  onSubmit,
  formValid,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onModalClose}>
          <img src={close} alt="close button" className="modal__close-icon" />
        </button>
        <form
          action=""
          className="modal__form"
          id="add-form"
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`modal__submit modal__el_hovered ${
              !formValid ? "modal__submit_disabled" : ""
            }`}
            type="submit"
            disabled={`${!formValid ? "disabled" : ""}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
