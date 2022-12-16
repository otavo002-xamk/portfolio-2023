import "./App.css";
import TopHeader from "./TopHeader";
import Footer from "./Footer";
import Center from "./Center";
import { ThemeContext, themes } from "./theme-context";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(themes.dark);
  const updateTheme = (theme) => {
    theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`h-screen ${theme.backGround}`}>
            <TopHeader />
            <Center />
            <Footer />
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}

export default App;
