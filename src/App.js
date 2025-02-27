import "./App.css";
import TopHeader from "./TopHeader";
import Footer from "./Footer";
import Center from "./Center";
import { LanguageContext, languages } from "./language-context";
import { useCallback, useState, useMemo } from "react";

function App() {
  const [language, setLanguage] = useState(languages.en);
  const updateLanguage = useCallback((event) => {
    setLanguage(languages[event.value]);
  });

  const contextValue = useMemo(
    () => ({
      language,
      updateLanguage,
    }),
    [language, updateLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <div className="min-h-screen bg-red-100 dark:bg-black">
        <TopHeader />
        <Center />
      </div>
      <div>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
