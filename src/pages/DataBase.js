import { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";

function DataBase() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.dataBase.title}</h1>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default DataBase;
