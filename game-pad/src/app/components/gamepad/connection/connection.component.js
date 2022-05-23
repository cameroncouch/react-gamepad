import React from 'react'
import { Component } from 'react'
import IndicateControllerConnection from '../../../containers/connection-indicator';
import styles from './connection-styles.css';

export class Connected extends Component {

  listenForGamepadConnection() {
    window.addEventListener("gamepadconnected", this.props.onGamepadConnection);
    window.addEventListener("gamepaddisconnected", this.props.onGamepadConnection);
  }

  componentDidMount() {
    this.listenForGamepadConnection();
  }

  render() {
    const connectionStatus = this.props.connectionStatus,
      gamePads = this.props.connectedPads ? this.props.connectedPads : null;
    return (
      <div className={styles.connection}>
        <div>
          <h1>Connection Status:</h1>
          {connectionStatus === "Gamepad Connected"
            ?
            <div>
              <p>{gamePads.length} controllers connected</p>
              <p>
                {this.props.chosenController ? `Testing controller #${this.props.chosenController}` : ''}
              </p>
            </div>
            : "No gamepads detected! Connect a controller or press a button on a currently connected controller."
          }
        </div>
        {gamePads.filter(pad => pad.connected) ?
          gamePads.map((pad, idx) => {
            return (
              <IndicateControllerConnection
                key={pad.index}
                value={idx}
                connected={pad.connected}
                onChosenController={this.props.handleChosenController}
              />
            )
          })
          : null
        }
      </div>
    );
  }
}