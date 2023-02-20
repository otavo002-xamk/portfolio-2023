import React from "react";
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="lg:col-start-2 lg:col-end-7 w-full lg:p-12 lg:pt-52 text-shadow dark:text-shadow-white">
      <Outlet />
    </div>
  );
}

export default Content;
