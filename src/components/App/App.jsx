import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
//import { defaultClothingItems } from "../../utils/constants.js";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import { addItem, getItems, deleteItem } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  // const handleMobileMenuOpened = () => {
  //   setMobileMebuOpened = true;
  // };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  // const newItem = {
  //   _id: Date.now().toString(), //  Unique ID
  //   name,
  //   link: imageUrl,
  //   weather,
  // };

  // console.log("Before adding - Current items:", clothingItems);
  // console.log("New item data:", { name, imageUrl, weather });
  // setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]);
  // console.log("After adding - Updated items:", [
  //   { name, link: imageUrl, weather },
  //   ...clothingItems,
  // ]);

  const handleDeleteItem = () => {
    const idToDelete = cardToDelete?._id;

    deleteItem(idToDelete)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete(null);
        setIsDeleteModalOpened(false);
        setActiveModal("");
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Something went wrong:", error);
      });
    // setClothingItems((prevItems) =>
    //   prevItems.filter((item) => item._id !== cardToDelete._id)
    // );
    // setCardToDelete(null);
    // setIsDeleteModalOpened(false);
    // setActiveModal("");
    // closeActiveModal();
  };
  const openConfirmationModal = (card) => {
    console.log("Opening confirmation modal for:", card);
    setCardToDelete(card);
    setActiveModal("");
    setIsDeleteModalOpened(true);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onClose={closeActiveModal}
            // handleMobileMenuOpened={handleMobileMenuOpened}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer author="Developed by Natalia Keegan" year="2025" />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          activeModal={activeModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          // onDeleteItem={handleDeleteItem}
          onOpenConfirmModal={openConfirmationModal}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpened}
          onClose={() => setIsDeleteModalOpened(false)}
          onConfirmation={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
