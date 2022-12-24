import React from "react";
import { LanguageContext } from "./language-context";

function LanguageToggler() {
  return (
    <LanguageContext.Consumer>
      <div className="float-right">
        <p className="dark:text-white">Language Toggler!</p>
      </div>
    </LanguageContext.Consumer>
  );
}

export default LanguageToggler;
