import React from "react";
import Content from "./Content";
import LeftNavBar from "./LeftNavBar";

function Center() {
  return (
    <div class="grid grid-cols-6 gap-4">
      <LeftNavBar />
      <Content />
    </div>
  );
}

export default Center;
