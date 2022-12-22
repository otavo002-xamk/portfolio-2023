import React from "react";
import { Link } from "react-router-dom";
import Image from "./pictures/home.png";
import Sun from "./pictures/sum_03.png";
import Moon from "./pictures/Crescent-moon.png";

function TopHeader() {
  const updateTheme = () => {
    document.body.classList.contains("dark")
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
  };

  return (
    <div className="p-2 bg-header bg-cover absolute w-full bg-red-600 h-40 shadow-headerShadow">
      <div className="float-left">
        <Link to="/">
          <img
            alt="home"
            className="object-scale-down h-32 opacity-50 hover:opacity-100 blur-sm hover:blur-none duration-300"
            src={Image}
          />
        </Link>
      </div>

      <div className="float-right shadow-md">
        <label
          htmlFor="toggle-theme"
          className="flex items-center cursor-pointer relative"
        >
          <input
            type="checkbox"
            onClick={() => updateTheme()}
            id="toggle-theme"
            className="sr-only"
          />
          <div className="toggle-bg bg-black h-6 w-12">
            <img src={Sun} alt="sun" className="h-4 w-4 float-left m-1" />
            <img src={Moon} alt="moon" className="h-4 w-4 float-right m-1" />
          </div>
        </label>
      </div>
    </div>
  );
}

export default TopHeader;
