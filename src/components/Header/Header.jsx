import "./Header.css";
import logo from "../../assets/logo.svg";
import defaultavatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpened ? "hidden" : "auto";
  }, [isMobileMenuOpened]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Natali Keegan";
  const avatar = "";

  return (
    <header className="header">
      <div className=" header__brand">
        <div className="header__top">
          <Link to="/">
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <button
            className={`header__hamburger ${
              isMobileMenuOpened ? "header__hamburger_hidden" : ""
            }`}
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
          ></button>
        </div>
        <div className="header__bottom">
          <p className="header__date-and-location">
            {currentDate} {weatherData.city}
          </p>
        </div>
      </div>

      {isMobileMenuOpened && (
        <div className="overlay" onClick={toggleMobileMenu}></div>
      )}
      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_opened" : "header__nav_closed"
        }`}
      >
        <button
          className="header__close"
          onClick={toggleMobileMenu}
          aria-label="Close mobile menu"
        ></button>

        <Link
          to="/profile"
          className="header__link"
          onClick={() => setIsMobileMenuOpened(false)}
        >
          <div className="header__user-container header__user-container_mobile">
            <div className="header__nav-header">
              <p className="header__username">{username}</p>
              {avatar ? (
                <img
                  src={avatar || defaultavatar}
                  alt="user avatar"
                  className="header__user-avatar header__user-avatar_none"
                />
              ) : (
                <span className="header__avatar ">
                  {username?.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </div>
        </Link>
        <button
          onClick={() => {
            handleAddClick();
            setIsMobileMenuOpened(false);
          }}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>
      <div className="header__actions">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container header__user-container_desktop">
            <p className="header__username">{username}</p>
            {avatar ? (
              <img
                src={avatar || defaultavatar}
                alt="user avatar"
                className="header__user-avatar header__user-avatar_none"
              />
            ) : (
              <span className="header__avatar ">
                {username?.toUpperCase().charAt(0) || ""}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
