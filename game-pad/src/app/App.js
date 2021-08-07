import React from "react";
import styles from './app-styles.css'
import { Gamepad } from "./components/gamepad/gamepad.component"

function App() {
  return (
    <div className={styles.App}>
        <Gamepad />
    </div>
  );
}

export default App;