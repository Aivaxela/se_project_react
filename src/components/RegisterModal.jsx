import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function RegisterModal({ isOpen, isLoading, handleRegistration }) {
  const { setActiveModal } = useContext(AppContext);

  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  const handleSubmit = () => {
    handleRegistration(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "", username: "", avatarUrl: "" });
  };

  return (
    <>
      <ModalWithForm
        title="Sign up"
        buttonText={isLoading ? "Registering" : "Next"}
        altButtonText={"or Log in"}
        altButtonClick={() => setActiveModal("login")}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        formValid={isValid}
      >
        <label htmlFor="email-signup" className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            id="email-signup"
            name="email"
            placeholder="Email"
            minLength="4"
            maxLength="64"
            required
            onChange={handleChange}
            value={values.email || ""}
          />
          <span
            className={`modal__input-error ${
              errors.email ? "modal__input-error_visible" : ""
            }`}
            id="email-error"
          >
            {errors.email}
          </span>
        </label>
        <label htmlFor="password-signup" className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            id="password-signup"
            name="password"
            placeholder="Password"
            minLength="8"
            maxLength="64"
            required
            onChange={handleChange}
            value={values.password || ""}
          />
          <span
            className={`modal__input-error ${
              errors.password ? "modal__input-error_visible" : ""
            }`}
            id="password-error"
          >
            {errors.password}
          </span>
        </label>
        <label htmlFor="name-signup" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name-signup"
            name="username"
            placeholder="Name"
            minLength="4"
            maxLength="16"
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
        <label htmlFor="avatarUrl" className="modal__label">
          Avatar URL
          <input
            type="url"
            className="modal__input"
            id="avatarUrl"
            name="avatarUrl"
            placeholder="Avatar Url"
            required
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

export default RegisterModal;
