import "../blocks/Modal.css";
import close from "../assets/close.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemModal({ card, onModalClose, isOpen, onDeleteClick }) {
  const { userData } = useContext(CurrentUserContext);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container-preview">
        <button className="modal__close" type="button" onClick={onModalClose}>
          <img src={close} alt="close button" className="modal__close-icon" />
        </button>
        <div className="modal__preview">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="modal__preview-image"
          />
          <div className="modal__preview-image-text-conatiner">
            <div className="modal__preview-image-caption">
              <p className="modal__subtext">{card.name}</p>
              <p className="modal__subtext">Weather: {card.weather}</p>
            </div>
            <p
              className={`modal__card-delete modal__el_hovered ${
                card.owner?._id === userData.id ? "" : "modal__el_hidden"
              }`}
              onClick={onDeleteClick}
            >
              Delete item
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
