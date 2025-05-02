import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";

import "./DarkMode.css";

const DarkMode = () => {
  const setDarkmode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightmode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  setDarkmode();

  return (
    <div className="dark_mode">
      <input className="dark_mode_input" type="checkbox" id="darkmode-toggle" />
      <label className="dark_mode_label">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
