import React from "react"
import { Component } from "react";
import buildButtons from "../../../containers/button";

export class Buttons extends Component {
  render() {
    const buttons = this.props.buttons.length > 0 ? this.props.buttons : null,
      chosenController = this.props.chosenController >= 0 ? this.props.chosenController : null;
    return buttons ? (
      <div className="buttons">
        <div className="top">
          <ol className="bumpers">
            {
              buttons ? buildButtons(4, 5, buttons[chosenController]) : null
            }
          </ol>
          <ol className="triggers">
            {
              buttons ? buildButtons(6, 7, buttons[chosenController]) : null
            }
          </ol>
        </div>
        <div className="middle">
          <ol className="dpad">
            {
              buttons ? buildButtons(12, 15, buttons[chosenController]) : null
            }
          </ol>
          <ol className="select">
            {
              buttons ? buildButtons(8, 8, buttons[chosenController]) : null
            }
          </ol>
          <ol className="touchpad">
            {
              buttons ? buildButtons(17, 17, buttons[chosenController]) : null
            }
          </ol>
          <ol className="start">
            {
              buttons ? buildButtons(9, 9, buttons[chosenController]) : null
            }
          </ol>
          <ol className="face">
            {
              buttons ? buildButtons(0, 3, buttons[chosenController]) : null
            }
          </ol>
        </div>
        <div className="bottom">
          <ol className="l3">
            {
              buttons ? buildButtons(10, 10, buttons[chosenController]) : null
            }
          </ol>
          <ol className="home">
            {
              buttons ? buildButtons(16, 16, buttons[chosenController]) : null
            }
          </ol>
          <ol className="r3">
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