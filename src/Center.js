import React from "react";
import Content from "./Content";
import LeftNavBar from "./LeftNavBar";

function Center() {
  return (
    <div className="lg:grid lg:grid-cols-6 h-full">
      <LeftNavBar />
      <Content />
    </div>
  );
}

export default Center;
