import React from "react";
import { ThemeContext } from "../theme-context";

function FrontPage() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <p className={theme.text}>Front Page!</p>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default FrontPage;
