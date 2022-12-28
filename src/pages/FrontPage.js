import React from "react";
import { LanguageContext } from "../language-context";

function FrontPage() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <p className="dark:text-white">{language.pages.frontPage.content}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default FrontPage;
