import React from "react";
import Content from "./Content";
import LeftNavBar from "./LeftNavBar";

function Center() {
  return (
    <div className="grid grid-cols-6">
      <LeftNavBar />
      <Content />
    </div>
  );
}

export default Center;
