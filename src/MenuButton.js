import React, { memo } from "react";
import PropTypes from "prop-types";

function MenuButton({ handleMenuChange, menuOpen }) {
  const bar1WhenMenuOpen = menuOpen
    ? "rotate-45 translate-y-2 duration-100 bg-orange-400 shadow-closeBurger"
    : "bg-white dark:bg-black shadow-burger dark:shadow-darkBurger";
  const bar2WhenMenuOpen = menuOpen && "opacity-0";
  const bar3WhenMenuOpen = menuOpen
    ? "-rotate-45 -translate-y-2 duration-100 bg-orange-400 shadow-closeBurger"
    : "bg-white dark:bg-black shadow-burger dark:shadow-darkBurger";

  return (
    <div
      className="menu-container mt-4 cursor-pointer lg:hidden"
      data-testid="menu-container"
      onClick={handleMenuChange}
    >
      <div className={`${bar1WhenMenuOpen} duration-100 w-6 h-1 mt-1`}></div>
      <div
        className={`${bar2WhenMenuOpen} duration-100 w-6 h-1 bg-white dark:bg-black mt-1 shadow-burger dark:shadow-darkBurger`}
      ></div>
      <div className={`${bar3WhenMenuOpen} duration-100 w-6 h-1 mt-1`}></div>
    </div>
  );
}

MenuButton.propTypes = {
  handleMenuChange: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool,
};

export default memo(MenuButton);
