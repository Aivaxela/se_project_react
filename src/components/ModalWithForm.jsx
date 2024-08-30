import "../blocks/Modal.css";
import close from "../assets/close.svg";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function ModalWithForm({
  children,
  buttonText,
  altButtonText,
  altButtonClick,
  title,
  isOpen,
  onSubmit,
  formValid,
}) {
  const { setActiveModal } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={() => setActiveModal("")}
        >
          <img src={close} alt="close button" className="modal__close-icon" />
        </button>
        <form action="" className="modal__form" onSubmit={handleSubmit}>
          {children}
          <div className="modal__buttons">
            <button
              className={`modal__submit modal__el_hovered ${
                !formValid ? "modal__submit_disabled" : ""
              }`}
              type="submit"
              disabled={`${!formValid ? "disabled" : ""}`}
            >
              {buttonText}
            </button>
            <button
              className={"modal__text-button modal__el_hovered"}
              type="button"
              onClick={altButtonClick}
            >
              {altButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
