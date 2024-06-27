import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import Validator from "../utils/validator";

function AddItemModal({ isOpen, onModalClose, onAddItem }) {
  const [selectedType, setSelectedType] = useState("hot");
  const [formValid, setFormValid] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [imageUrlErrorMsg, setImageUrlErrorMsg] = useState("");
  const nameInputEl = document.querySelector("#name");
  const imageInputEl = document.querySelector("#imageUrl");
  const formEl = document.querySelector("#add-form");
  const addFormValidator = new Validator(formEl, setFormValid);
  addFormValidator.initializeFormEl();

  const resetForm = () => {
    nameInputEl.value = "";
    imageInputEl.value = "";
    setFormValid(false);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onModalClose={onModalClose}
      onSubmit={(e) => {
        const newItem = {
          _id: null,
          name: nameInputEl.value,
          weather: selectedType,
          imageUrl: imageInputEl.value,
        };
        onAddItem(e, newItem, resetForm);
      }}
      formValid={formValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="4"
          maxLength="16"
          required
          onChange={() => {
            setNameErrorMsg(addFormValidator.handleErrorMessage("name"));
          }}
        />
        <span className="modal__input-error" id="name-error">
          {nameErrorMsg}
        </span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={() => {
            setImageUrlErrorMsg(
              addFormValidator.handleErrorMessage("imageUrl")
            );
          }}
        />
        <span className="modal__input-error" id="imageUrl-error">
          {imageUrlErrorMsg}
        </span>
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
            required
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
