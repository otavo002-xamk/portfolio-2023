import "./App.css";
import TopHeader from "./TopHeader";
import Footer from "./Footer";
import Center from "./Center";
import { LanguageContext, languages } from "./language-context";
import { useState } from "react";

function App() {
  const [language, setLanguage] = useState(languages.en);
  const updateLanguage = (event) => {
    console.log(event);
  };

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      <div className="h-screen bg-red-100 dark:bg-black">
        <TopHeader />
        <Center />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
