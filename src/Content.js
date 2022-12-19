import React from "react";
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="lg:col-start-2 lg:col-end-7 w-full pt-12 lg:pt-52">
      <h3 className="dark:text-white">Content</h3>
      <p className="dark:text-white">Test one!</p>
      <Outlet />
    </div>
  );
}

export default Content;
