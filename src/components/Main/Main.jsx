import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
//import { defaultClothingItems } from "../../utils/constants.js";
import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const filteredItems = weatherData.type
    ? clothingItems.filter(
        (item) => item.weather?.toLowerCase() === weatherData.type.toLowerCase()
      )
    : clothingItems;

  // console.log("Main component - Received clothingItems:", clothingItems);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        {filteredItems.length > 0 ? (
          <ul className="cards__list">
            {filteredItems /* {clothingItems
            .filter((item) => {
              // console.log("Item weather:", item.weather);
              // console.log("Current weather type:", weatherData.type);
              return (
                item.weather?.toLowerCase() === weatherData.type.toLowerCase()
              );
            }) */

              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                  />
                );
              })}
          </ul>
        ) : (
          <p className="cards__fallback">
            No clothing matches the current weather.
          </p>
        )}
      </section>
    </main>
  );
}

export default Main;
