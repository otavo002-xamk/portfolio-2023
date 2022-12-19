import "./App.css";
import TopHeader from "./TopHeader";
import Footer from "./Footer";
import Center from "./Center";
import { ThemeContext } from "./theme-context";

function App() {
  const updateTheme = () => {
    document.body.classList.contains("dark")
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
  };

  return (
    <ThemeContext.Provider value={{ updateTheme }}>
      <div className="h-screen bg-red-100 dark:bg-black">
        <TopHeader />
        <Center />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
