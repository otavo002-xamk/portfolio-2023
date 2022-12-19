import React from "react";
import { Link } from "react-router-dom";
import Image from "./pictures/home.png";
import Sun from "./pictures/sum_03.png";
import Moon from "./pictures/1476842879.png";
import { ThemeContext } from "./theme-context";

function TopHeader() {
  return (
    <ThemeContext.Consumer>
      {({ theme, updateTheme }) => (
        <div className="p-2 bg-header bg-cover absolute w-full bg-red-600 h-40">
          <div className="float-left">
            <Link to="/">
              <img
                aria-label="home"
                className="object-scale-down h-32 opacity-50 hover:opacity-100 blur-sm hover:blur-none duration-300"
                src={Image}
              />
            </Link>
          </div>

          <div className="float-right">
            <label
              for="toggle-theme"
              className="flex items-center cursor-pointer relative"
            >
              <input
                type="checkbox"
                onClick={() => updateTheme(theme)}
                id="toggle-theme"
                className="sr-only"
              />
              <div className="toggle-bg bg-black h-6 w-12">
                <img src={Sun} className="h-6 w-6 float-left" />
                <img src={Moon} className="h-6 w-6 float-right" />
              </div>
            </label>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default TopHeader;
