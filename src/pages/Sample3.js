import React from "react";
import { ThemeContext } from "../theme-context";

function Sample3() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <p className={theme.text}>Sample 3!</p>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Sample3;
