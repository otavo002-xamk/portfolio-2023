import React from "react";
import { Link } from "react-router-dom";
import Image from "./pictures/home.png";
import ThemeToggler from "./ThemeToggler";

function TopHeader() {
  const updateTheme = () => {
    document.body.classList.contains("dark")
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
  };

  return (
    <div className="p-2 bg-header bg-cover absolute w-full bg-red-600 h-40 shadow-header">
      <div className="float-left">
        <Link to="/">
          <img
            alt="home"
            className="object-scale-down h-32 opacity-50 hover:opacity-100 blur-sm hover:blur-none duration-300"
            src={Image}
          />
        </Link>
      </div>

      <ThemeToggler handleClick={updateTheme} />
    </div>
  );
}

export default TopHeader;
