import React from "react";

function MenuButton({ handleMenuChange, menuOpen }) {
  const bar1WhenMenuOpen = menuOpen
    ? "rotate-45 translate-y-2 duration-100 bg-orange-400"
    : "bg-white dark:bg-black";
  const bar2WhenMenuOpen = menuOpen && "opacity-0";
  const bar3WhenMenuOpen = menuOpen
    ? "-rotate-45 -translate-y-2 duration-100 bg-orange-400"
    : "bg-white dark:bg-black";

  return (
    <div
      className="menu-container lg:hidden"
      data-testid="menu-container"
      onClick={handleMenuChange}
    >
      <div className={`${bar1WhenMenuOpen} duration-100 w-6 h-1 mt-1`}></div>
      <div
        className={`${bar2WhenMenuOpen} duration-100 w-6 h-1 bg-white dark:bg-black mt-1`}
      ></div>
      <div className={`${bar3WhenMenuOpen} duration-100 w-6 h-1 mt-1`}></div>
    </div>
  );
}

export default MenuButton;
