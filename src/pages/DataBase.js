import { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";

function DataBase() {
  const [dbTables, setDBTables] = useState(null);
  const [selectedDBTable, setSelectedDBTable] = useState(null);
  const [dbTableContents, setDBTableContents] = useState([]);

  useEffect(() => {
    console.log("starting fetch");

    fetch("/api")
      .then((result) => {
        return new Promise((resolve, _reject) => {
          console.log(result);
          resolve(result.json());
        });
      })
      .then((data) => {
        return new Promise((resolve, _reject) => {
          console.log(data);
          resolve(setDBTables(data));
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        setDBTables(null);
      });
  }, []);

  useEffect(() => {
    selectedDBTable &&
      fetch("/api", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ table: selectedDBTable }),
      })
        .then((result) => result.json())
        .then((data) => {
          data && setDBTableContents(data);
        })
        .catch((_error) => setDBTableContents([]));
  }, [selectedDBTable]);

  const selectDBTable = (e) => {
    e.target.value === "0"
      ? setSelectedDBTable(null)
      : setSelectedDBTable(e.target.value);
  };

  console.log(process.env.REACT_APP_DBURL);

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.dataBase.title}</h1>
          <br />
          {dbTables ? (
            <>
              <select
                className="max-w-full dark:bg-slate-800"
                data-testid="db-table-select"
                id="table-select"
                onChange={selectDBTable}
              >
                <option
                  className="font-bold"
                  key={language.pages.dataBase.selectTable}
                  value={0}
                >
                  {language.pages.dataBase.selectTable}
                </option>
                {dbTables.map((table) => (
                  <option
                    key={Object.values(table)[0]}
                    value={Object.values(table)[0]}
                  >
                    {Object.values(table)[0]}
                  </option>
                ))}
              </select>
              <br />
              <br />
            </>
          ) : (
            <p>{language.pages.dataBase.noConnection}</p>
          )}
          {dbTableContents.length > 0 && (
            <table data-testid="db-contents-table">
              <thead>
                <tr>
                  {Object.entries(dbTableContents[0]).map((entry, i) => (
                    <th key={i} className="p-2 border-2 border-stone-800">
                      {entry[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dbTableContents.map((item, i) => (
                  <tr key={i}>
                    {Object.entries(item).map((entry, i) => (
                      <th key={i} className="p-2 border-2 border-stone-800">
                        {entry[1]}
                      </th>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {dbTableContents.length === 0 && selectedDBTable && (
            <p>{language.pages.dataBase.noData}</p>
          )}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default DataBase;
