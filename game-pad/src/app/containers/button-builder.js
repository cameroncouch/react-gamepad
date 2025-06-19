import React from "react"

const buttonMapping = {
  "0": "face-south",
  "1": "face-right",
  "2": "face-left",
  "3": "face-north",
  "4": "left-bumper",
  "5": "right-bumper",
  "6": "left-shoulder",
  "7": "right-shoulder",
  "8": "select",
  "9": "start",
  "10": "left-stick-btn",
  "11": "right-stick-btn",
  "12": "pad-up",
  "13": "pad-down",
  "14": "pad-left",
  "15": "pad-right",
  "16": "home-btn"
}

export default function buildButtons(start, stop, buttons, exact) {
  return buttons ? buttons.map(
    (button, idx) => {
      if (exact && idx === start || idx === stop) {
        return (
          <li
            key={idx}
            value={button.value}
            id={`button-${idx}`}
            className={button.className}
            data-name={buttonMapping[idx]}
          >
          </li>
        )
      }
      else if (!exact && (idx >= start && idx <= stop)) {
        return (
          <li
            key={idx}
            value={button.value}
            id={`button-${idx}`}
            className={button.className}
            data-name={buttonMapping[idx]}
          >
          </li>
        )
      }
      return null;
    })
    : null
}