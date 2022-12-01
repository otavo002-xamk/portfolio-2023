import React from "react";
import Image from "./pictures/home.png";

function TopHeader() {
  return (
    <div className="p-2 bg-header bg-cover absolute w-full bg-red-600 h-40">
      <a href="/">
        <img
          className="object-scale-down h-32 opacity-50 hover:opacity-100 blur-sm hover:blur-none duration-300"
          src={Image}
        />
      </a>
    </div>
  );
}

export default TopHeader;
