import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

function AddItemModal({ isOpen, onModalClose, onAddItem }) {
  const [selectedType, setSelectedType] = useState("hot");
  const nameInputEl = document.querySelector("#name");
  const imageInputEl = document.querySelector("#imageUrl");

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onModalClose={onModalClose}
      onSubmit={(e) => {
        const newItem = {
          name: nameInputEl.value,
          weather: selectedType,
          link: imageInputEl.value,
        };
        onAddItem(e, newItem);
      }}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="hot"
            checked={selectedType === "hot"}
            onChange={() => setSelectedType("hot")}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            checked={selectedType === "warm"}
            onChange={() => setSelectedType("warm")}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            checked={selectedType === "cold"}
            onChange={() => setSelectedType("cold")}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
