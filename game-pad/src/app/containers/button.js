import React from "react"

export default function buildButtons(start, stop, buttons) {
  return buttons ? buttons.map(
    (button, idx) => {
      if (idx >= start && idx <= stop) {
        return (
          <li
            key={idx}
            value={button.value}
            id={`button-${idx}`}
            className={button.className}
          >
            {"BUTTON" + idx + button.pressed}
          </li>
        )
      }
      return null;
    })
    : null
}