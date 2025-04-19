import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
function AddItemModal({
  onClose,
  isOpen,
  activeModal,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.link,
      weather: values.weatherType,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${
            errors.name ? "modal__input_invalid" : ""
          }`}
          id="name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className={`modal__input ${
            errors.link ? "modal__input_invalid" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.link || ""}
        />
        {errors.link && <span className="modal__error">{errors.link}</span>}
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} htmlFor={type} className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id={type}
              name="weatherType"
              value={type}
              onChange={handleChange}
              checked={values.weatherType === type}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        {/* <label htmlFor="hot" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weatherType"
            value="hot"
            onChange={handleChange}
            checked={weather === "hot"}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weatherType"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weatherType"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          Cold
        </label> */}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
