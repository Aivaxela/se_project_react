export default class Validator {
  constructor(formEl, setFormValid) {
    this._formEl = formEl;
    this._setFormValid = setFormValid;
  }

  initializeFormEl() {
    if (!this._formEl) return;
    this._formInputs = Array.from(
      this._formEl.querySelectorAll(".modal__input")
    );
  }

  handleErrorMessage(id) {
    const inputEl = this._formInputs
      ? this._formInputs.find((input) => id === input.id)
      : "";
    const errorSpanEl = document.querySelector(`#${id}-error`);
    if (!inputEl.validity.valid) {
      errorSpanEl.classList.add("modal__input-error_visible");
    } else {
      errorSpanEl.classList.remove("modal__input-error_visible");
    }
    this._setFormValid(this._formInputs.every((input) => input.validity.valid));
    return inputEl.validationMessage;
  }
}
