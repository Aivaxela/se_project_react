import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";

function AddItemModal({ isOpen, onModalClose, onAddItem, isLoading }) {
  const [selectedType, setSelectedType] = useState("hot");
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onModalClose={onModalClose}
      onSubmit={(e) => {
        const newItem = {
          _id: null,
          name: values.name,
          weather: selectedType,
          imageUrl: values.imageUrl,
        };
        onAddItem(e, newItem);
        resetForm({ name: "", imageUrl: "" });
      }}
      formValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          minLength="4"
          maxLength="16"
          required
          onChange={handleChange}
          value={values.name}
        />
        <span
          className={`modal__input-error ${
            errors.name ? "modal__input-error_visible" : ""
          }`}
          id="name-error"
        >
          {errors.name}
        </span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
        <span
          className={`modal__input-error ${
            errors.imageUrl ? "modal__input-error_visible" : ""
          }`}
          id="imageUrl-error"
        >
          {errors.imageUrl}
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
