import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";

function LoginModal({ isOpen, handleRegisterClick, onModalClose, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "" });
  };

  return (
    <>
      <ModalWithForm
        title="Log in"
        buttonText={isLoading ? "Logging in" : "Login"}
        altButtonText={"or Register"}
        altButtonClick={handleRegisterClick}
        isOpen={isOpen}
        onModalClose={onModalClose}
        onSubmit={(e) => {
          e.preventDefault();
          const loginData = {
            email: values.email,
            password: values.password,
          };
          //TODO: pass login data
        }}
        formValid={isValid}
      >
        <label htmlFor="email-login" className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            id="email-login"
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
        <label htmlFor="password-login" className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            id="password-login"
            name="password"
            placeholder="Password"
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
      </ModalWithForm>
    </>
  );
}

export default LoginModal;
