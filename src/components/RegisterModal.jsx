import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/useFormAndValidation";

function RegisterModal({ isOpen, onModalClose, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "", name: "", avatarUrl: "" });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Registering" : "Next"}
      isOpen={isOpen}
      onModalClose={onModalClose}
      onSubmit={(e) => {
        e.preventDefault();
        const newUser = {
          _id: null,
          email: values.email,
          password: values.password,
          name: values.name,
          avatarUrl: values.avatarUrl,
        };
        // TODO: pass new user
      }}
      formValid={isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
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
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
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
          value={values.name || ""}
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
  );
}

export default RegisterModal;
