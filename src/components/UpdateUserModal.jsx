import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function UpdateUserModal({ isOpen, handleUpdateUser, isLoading }) {
  const { userData } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  useEffect(() => {
    setValues({ username: userData.name, avatarUrl: userData.avatarUrl });
  }, [isOpen]);

  const handleSubmit = () => {
    handleUpdateUser(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ username: "", avatarUrl: "" });
  };

  return (
    <>
      <ModalWithForm
        title={"Change profile data"}
        buttonText={isLoading ? "Saving..." : "Save changes"}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        formValid={isValid}
      >
        <label htmlFor="name-update" className="modal__label">
          Name*
          <input
            type="text"
            className="modal__input"
            id="name-update"
            name="username"
            placeholder="Name"
            minLength="4"
            maxLength="64"
            required
            onChange={handleChange}
            value={values.username || ""}
          />
          <span
            className={`modal__input-error ${
              errors.username ? "modal__input-error_visible" : ""
            }`}
            id="name-error"
          >
            {errors.username}
          </span>
        </label>
        <label htmlFor="avatarUrl-update" className="modal__label">
          Avatar URL
          <input
            type="url"
            className="modal__input"
            id="avatarUrl-update"
            name="avatarUrl"
            placeholder="Avatar Url"
            onChange={handleChange}
            value={values.avatarUrl || ""}
          />
          <span
            className={`modal__input-error ${
              errors.avatarUrl ? "modal__input-error_visible" : ""
            }`}
            id="avatarUrl-error"
          >
            {errors.avatarUrl}
          </span>
        </label>
      </ModalWithForm>
    </>
  );
}

export default UpdateUserModal;
