import React from "react";

export const themes = {
  light: {
    topHeaderBackGround: "bg-red-600",
    leftNavBarBackGround: "bg-black",
    backGround: "bg-red-100",
    leftNavBarText: "text-white",
  },
  dark: {
    topHeaderBackGround: "bg-red-600",
    leftNavBarBackGround: "bg-red-100",
    backGround: "bg-black",
    text: "text-white",
  },
};

export const ThemeContext = React.createContext(themes);
