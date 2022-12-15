import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuButton from "./MenuButton";

function LeftNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const changeMenuOpenState = () => setMenuOpen(!menuOpen);
  const itemsWhenMenuOpen = !menuOpen && "hidden";
  const location = useLocation();
  let link1TextColor = "text-white";
  let link2TextColor = "text-white";
  let link3TextColor = "text-white";
  let link4TextColor = "text-white";

  useEffect(() => setMenuOpen(false), [location]);

  switch (location.pathname) {
    case "/sample1":
      link1TextColor = "text-red-400";
      break;
    case "/sample2":
      link2TextColor = "text-red-400";
      break;
    case "/sample3":
      link3TextColor = "text-red-400";
      break;
    case "/sample4":
      link4TextColor = "text-red-400";
      break;
    default:
      break;
  }

  return (
    <div className="bg-leftNavBar bg-cover pt-40 lg:col-start-1 lg:col-end-1 p-4 bg-black">
      <MenuButton handleMenuChange={changeMenuOpenState} menuOpen={menuOpen} />
      <div className={`${itemsWhenMenuOpen} p-4 lg:block`}>
        <p className={`${link1TextColor} my-1 font-serif`}>
          <Link to="/sample1">Sample 1</Link>
        </p>
        <p className={`${link2TextColor} my-1 font-serif`}>
          <Link to="/sample2">Sample 2</Link>
        </p>
        <p className={`${link3TextColor} my-1 font-serif`}>
          <Link to="/sample3">Sample 3</Link>
        </p>
        <p className={`${link4TextColor} my-1 font-serif`}>
          <Link to="/sample4">Sample 4</Link>
        </p>
      </div>
    </div>
  );
}

export default LeftNavBar;
