import React from "react"
import styles from "./conn-indicator.css"

export default function IndicateControllerConnection(props) {

  return (
    <div className={styles.connected}>
      <button
        value={props.value}
        onClick={props.onChosenController}
        className={styles.button}
      >
        Click to Test 🎮 #{props.value}
      </button>
    </div>
  )
}