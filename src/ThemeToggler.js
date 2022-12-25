import React from "react";
import Sun from "./pictures/sum_03.png";
import Moon from "./pictures/Crescent-moon.png";

function ThemeToggler({ handleClick }) {
  return (
    <div className="float-left tablet:pt-4 pt-2 shadow-md">
      <label
        htmlFor="toggle-theme"
        className="flex items-center cursor-pointer relative"
      >
        <input
          type="checkbox"
          onClick={() => handleClick()}
          id="toggle-theme"
          className="sr-only"
        />
        <div className="toggle-bg bg-black h-6 w-12">
          <img src={Sun} alt="sun" className="h-4 w-4 float-left m-1" />
          <img src={Moon} alt="moon" className="h-4 w-4 float-right m-1" />
        </div>
      </label>
    </div>
  );
}

export default ThemeToggler;
