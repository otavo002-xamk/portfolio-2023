import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "./language-context";
import MenuButton from "./MenuButton";

function LeftNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const changeMenuOpenState = useCallback(
    () => setMenuOpen(!menuOpen),
    [menuOpen]
  );
  const itemsWhenMenuOpen = !menuOpen && "hidden";
  const location = useLocation();
  let link1Active = false;
  let link2Active = false;
  let link3Active = false;
  let link4Active = false;

  useEffect(() => setMenuOpen(false), [location]);

  switch (location.pathname) {
    case "/MathGame":
      link1Active = true;
      break;
    case "/sample2":
      link2Active = true;
      break;
    case "/sample3":
      link3Active = true;
      break;
    case "/sample4":
      link4Active = true;
      break;
    default:
      break;
  }

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="lg:h-screen bg-leftNavBar bg-cover pt-40 lg:col-start-1 lg:col-end-1 p-4 bg-black dark:bg-red-100 shadow-navbar dark:shadow-darkNavbar text-shadow-white dark:text-shadow">
          <MenuButton
            handleMenuChange={changeMenuOpenState}
            menuOpen={menuOpen}
          />
          <div className={`${itemsWhenMenuOpen} p-4 lg:block`}>
            <p
              className={`${
                link1Active
                  ? "text-red-400 text-shadow-active"
                  : "text-white dark:text-black"
              } my-1 font-serif hover:text-red-300 dark:hover:text-red-300 hover:text-shadow-hover`}
            >
              <Link to="/MathGame">{language.pages.mathGame.link}</Link>
            </p>
            <p
              className={`${
                link2Active
                  ? "text-red-400 text-shadow-active"
                  : "text-white dark:text-black"
              } my-1 font-serif hover:text-red-300 dark:hover:text-red-300 hover:text-shadow-hover`}
            >
              <Link to="/sample2">{language.pages.sample2.link}</Link>
            </p>
            <p
              className={`${
                link3Active
                  ? "text-red-400 text-shadow-active"
                  : "text-white dark:text-black"
              } my-1 font-serif hover:text-red-300 dark:hover:text-red-300 hover:text-shadow-hover`}
            >
              <Link to="/sample3">{language.pages.sample3.link}</Link>
            </p>
            <p
              className={`${
                link4Active
                  ? "text-red-400 text-shadow-active"
                  : "text-white dark:text-black"
              } my-1 font-serif hover:text-red-300 dark:hover:text-red-300 hover:text-shadow-hover`}
            >
              <Link to="/sample4">{language.pages.sample4.link}</Link>
            </p>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default LeftNavBar;
