import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function LoginModal({ isOpen, handleLogin, isLoading }) {
  const { setActiveModal } = useContext(AppContext);

  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = () => {
    handleLogin(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "" });
  };

  return (
    <>
      <ModalWithForm
        title="Log in"
        buttonText={isLoading ? "Logging in" : "Login"}
        altButtonText={"or Register"}
        altButtonClick={() => setActiveModal("register")}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        formValid={isValid}
      >
        <label htmlFor="email-login" className="modal__label">
          Email*
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
        </label>
        <label htmlFor="password-login" className="modal__label">
          Password*
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
        </label>
      </ModalWithForm>
    </>
  );
}

export default LoginModal;
