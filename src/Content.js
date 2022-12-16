import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./theme-context";

function Content() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className="lg:col-start-2 lg:col-end-7 w-full pt-12 lg:pt-52">
          <h3 className={theme.text}>Content</h3>
          <p className={theme.text}>Test one!</p>
          <Outlet />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Content;
