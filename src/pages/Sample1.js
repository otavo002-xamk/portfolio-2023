import React from "react";
import { ThemeContext } from "../theme-context";

function Sample1() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <p className={theme.text}>Sample 1!</p>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Sample1;
