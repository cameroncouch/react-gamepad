import React from "react"
import { Component } from "react";
import buildButtons from "../../../containers/button";
import styles from "./button-styles.css";

export class Buttons extends Component {
  render() {
    const buttons = this.props.buttons.length > 0 ? this.props.buttons : null,
      chosenController = this.props.chosenController >= 0 ? this.props.chosenController : null;
    return buttons ? (
      <div className={styles.buttons}>
        <div className={styles.top}>
          <ol className={styles.bumpers}>
            {
              buttons ? buildButtons(4, 5, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.triggers}>
            {
              buttons ? buildButtons(6, 7, buttons[chosenController]) : null
            }
          </ol>
        </div>
        <div className={styles.middle}>
          <ol className={styles.dpad}>
            {
              buttons ? buildButtons(12, 15, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.select}>
            {
              buttons ? buildButtons(8, 8, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.touchpad}>
            {
              buttons ? buildButtons(17, 17, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.start}>
            {
              buttons ? buildButtons(9, 9, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.face}>
            {
              buttons ? buildButtons(0, 3, buttons[chosenController]) : null
            }
          </ol>
        </div>
        <div className={styles.bottom}>
          <ol className={styles.l3}>
            {
              buttons ? buildButtons(10, 10, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.home}>
            {
              buttons ? buildButtons(16, 16, buttons[chosenController]) : null
            }
          </ol>
          <ol className={styles.r3}>
            {
              buttons ? buildButtons(11, 11, buttons[chosenController]) : null
            }
          </ol>
        </div>
      </div>
    )
      : '';
  }
}