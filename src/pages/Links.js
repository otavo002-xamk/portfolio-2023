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
          <div>
            <div className="md:w-1/4 md:float-left">
              <p className="mb-8">
                <b>Git Repositories:</b>
              </p>
            </div>
            <div className="md:w-3/4 md:float-right pl-12">
              <a href="https://sourceforge.net/u/woudiiii-girps/profile">
                https://sourceforge.net/u/woudiiii-girps/profile
              </a>
              <br />
              <br />
              <a href="https://github.com/otavo002-xamk">
                https://github.com/otavo002-xamk
              </a>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Links;
