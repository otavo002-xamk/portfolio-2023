import React from "react";
import { LanguageContext } from "../language-context";

function Links() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.links.title}</h1>
          <br />
          <br />
          <p>
            <b>Git Repositories:</b>
          </p>
          <a href="https://sourceforge.net/u/woudiiii-girps/profile">
            https://sourceforge.net/u/woudiiii-girps/profile
          </a>
          <br />
          <a href="https://github.com/otavo002-xamk">
            https://github.com/otavo002-xamk
          </a>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Links;
