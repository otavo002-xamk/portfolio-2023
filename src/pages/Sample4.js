import React from "react";
import { ThemeContext } from "../theme-context";

function Sample4() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <p className={theme.text}>Sample 4!</p>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Sample4;
