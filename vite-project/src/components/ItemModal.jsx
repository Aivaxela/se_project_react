import "../blocks/Modal.css";
import close from "../assets/close.svg";

function ItemModal({ activeModal, card, handleModalClose }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container-preview">
        <button
          className="modal__close"
          type="button"
          onClick={handleModalClose}
        >
          <img src={close} alt="close button" className="modal__close-icon" />
        </button>
        <div className="modal__preview">
          <img
            src={card.link}
            alt={card.name}
            className="modal__preview-image"
          />
          <div className="modal__preview-image-caption">
            <p className="modal__preview-image-caption-text">{card.name}</p>
            <p className="modal__preview-image-caption-text">
              Weather: {card.weather}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
