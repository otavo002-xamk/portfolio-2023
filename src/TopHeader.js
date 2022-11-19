import React from "react";
import Image from "./pictures/home.png";

function TopHeader() {
  return (
    <div className="p-2 bg-header bg-cover absolute w-full bg-red-600 h-40">
      <img className="object-scale-down h-32" src={Image} />
    </div>
  );
}

export default TopHeader;
