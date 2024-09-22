import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function UpdateUserModal({ isOpen, handleUpdateUser, isLoading }) {
  const { userData } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  useEffect(() => {
    setValues({ username: userData.name, avatar: userData.avatar });
  }, [isOpen, setValues, userData]);

  const handleSubmit = () => {
    handleUpdateUser(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ username: "", avatar: "" });
  };

  return (
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
          minLength="2"
          maxLength="30"
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
      <label htmlFor="avatar-update" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="avatar-update"
          name="avatar"
          placeholder="Avatar Url"
          onChange={handleChange}
          value={values.avatar || ""}
        />
        <span
          className={`modal__input-error ${
            errors.avatar ? "modal__input-error_visible" : ""
          }`}
          id="avatar-error"
        >
          {errors.avatar}
        </span>
      </label>
    </ModalWithForm>
  );
}

export default UpdateUserModal;
