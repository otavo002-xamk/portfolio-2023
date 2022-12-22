import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuButton from "./MenuButton";

function LeftNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const changeMenuOpenState = () => setMenuOpen(!menuOpen);
  const itemsWhenMenuOpen = !menuOpen && "hidden";
  const location = useLocation();
  let link1Active = false;
  let link2Active = false;
  let link3Active = false;
  let link4Active = false;

  useEffect(() => setMenuOpen(false), [location]);

  switch (location.pathname) {
    case "/sample1":
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
    <div className="bg-leftNavBar bg-cover pt-40 lg:col-start-1 lg:col-end-1 p-4 bg-black dark:bg-red-100 text-shadow-menu dark:text-shadow-darkmenu">
      <MenuButton handleMenuChange={changeMenuOpenState} menuOpen={menuOpen} />
      <div className={`${itemsWhenMenuOpen} p-4 lg:block`}>
        <p
          className={`${
            link1Active ? "text-red-400" : "text-white dark:text-black"
          } my-1 font-serif`}
        >
          <Link to="/sample1">Sample 1</Link>
        </p>
        <p
          className={`${
            link2Active ? "text-red-400" : "text-white dark:text-black"
          } my-1 font-serif`}
        >
          <Link to="/sample2">Sample 2</Link>
        </p>
        <p
          className={`${
            link3Active ? "text-red-400" : "text-white dark:text-black"
          } my-1 font-serif`}
        >
          <Link to="/sample3">Sample 3</Link>
        </p>
        <p
          className={`${
            link4Active ? "text-red-400" : "text-white dark:text-black"
          } my-1 font-serif`}
        >
          <Link to="/sample4">Sample 4</Link>
        </p>
      </div>
    </div>
  );
}

export default LeftNavBar;
