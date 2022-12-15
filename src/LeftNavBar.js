import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";

function LeftNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const changeMenuOpenState = () => setMenuOpen(!menuOpen);
  const itemsWhenMenuOpen = !menuOpen && "hidden";

  return (
    <div className="bg-leftNavBar bg-cover pt-40 lg:col-start-1 lg:col-end-1 p-4 bg-black">
      <MenuButton handleMenuChange={changeMenuOpenState} menuOpen={menuOpen} />
      <div className={`${itemsWhenMenuOpen} p-4 lg:block`}>
        <p className="text-white my-1 font-serif">
          <Link to="/sample1">Sample 1</Link>
        </p>
        <p className="text-white my-1 font-serif">
          <Link to="/sample2">Sample 2</Link>
        </p>
        <p className="text-white my-1 font-serif">
          <Link to="/sample3">Sample 3</Link>
        </p>
        <p className="text-white my-1 font-serif">
          <Link to="/sample4">Sample 4</Link>
        </p>
      </div>
    </div>
  );
}

export default LeftNavBar;
