import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function AddItemModal({ onClose, isOpen, activeModal, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [nameError, setNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim().length < 2) {
      setNameError("Name must be at least 2 characters.");
    } else {
      setNameError("");
    }
  };
  const handleImageChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    const urlTipe = /^https?:\/\/\S+\.\S+/;
    if (!urlTipe.test(value)) {
      setImageUrlError("Please enter a valid image URL");
    } else {
      setImageUrlError("");
    }
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setNameError("");
      setImageUrlError("");
      setIsFormValid(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const isValid =
      name.trim().length >= 2 &&
      imageUrl.trim().startsWith("http") &&
      !nameError &&
      !imageUrlError &&
      weather;
    setIsFormValid(isValid);
  }, [name, imageUrl, weather, nameError, imageUrlError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onAddItemModalSubmit({ name, imageUrl, weather });
    // setName("");
    // setImageUrl("");
    // setWeather("");
  };
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${nameError ? "modal__input_invalid" : ""}`}
          id="name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className={`modal__input ${
            imageUrlError ? "modal__input_invalid" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageChange}
          value={imageUrl}
        />
        {imageUrlError && <span className="modal__error">{imageUrlError}</span>}
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weatherType"
            value="hot"
            onChange={handleWeatherChange}
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
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
