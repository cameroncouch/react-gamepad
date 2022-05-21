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
        {
           gamePads.filter(pad => pad.connected) ?
              gamePads.map((pad) => {
                return (
                  <IndicateControllerConnection
                    key={pad.index}
                    value={pad.index}
                    gamePads={gamePads}
                    onChosenController={this.props.handleChosenController}
                  />
                )
              })
              : null
        }
        <p>Connection Status</p>
        <p>{connectionStatus}</p>
        {connectionStatus === "Gamepad Connected" ? <p>Testing gamepad #{this.props.chosenController}</p> : ''}
      </div>
    );
  }
}