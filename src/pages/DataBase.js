import { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";

function DataBase() {
  const [dbTables, setDBTables] = useState(null);
  const [selectedDBTable, setSelectedDBTable] = useState(null);
  const [dbTableContents, setDBTableContents] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((result) => result.json())
      .then((data) => {
        setDBTables(data);
      })
      .catch((_error) => setDBTables(null));
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
          setDBTableContents(data);
        })
        .catch((_error) => setDBTableContents(null));
  }, [selectedDBTable]);

  const selectDBTable = (e) => {
    e.target.value === "0"
      ? setSelectedDBTable(null)
      : setSelectedDBTable(e.target.value);
  };

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
            <table>
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
          {dbTableContents.length === 0 && selectedDBTable && <p>no data</p>}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default DataBase;
