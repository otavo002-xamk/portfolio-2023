import React from "react";
import { ThemeContext } from "../theme-context";

function Sample2() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <p className={theme.text}>Sample 2!</p>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Sample2;
