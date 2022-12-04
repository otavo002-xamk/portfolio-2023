import React from "react";
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="lg:col-start-2 lg:col-end-7 w-full bg-red-100 pt-52">
      <h3>Content</h3>
      <Outlet />
    </div>
  );
}

export default Content;
