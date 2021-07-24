import React from "react";
import './App.css'

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //some state
    }
  }

  buildButtons(start, stop, buttons) {
    return buttons[0].map(
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
      }
    )
  }

  render() {
    const gamePads = this.props.connectedPads.length > 0 ? this.props.connectedPads : null,
      buttons = this.props.buttons.length > 0 ? this.props.buttons : null;
    return (
      <div className="buttons">
        <div className="top">
          <ol className="bumpers">
            {
              gamePads ? this.buildButtons(4, 5, buttons) : null
            }
          </ol>
          <ol className="triggers">
            {
              gamePads ? this.buildButtons(6, 7, buttons) : null
            }
          </ol>
        </div>
        <div className="middle">
          <ol className="dpad">
            {
              gamePads ? this.buildButtons(12, 15, buttons) : null
            }
          </ol>
          <ol className="select">
            {
              gamePads ? this.buildButtons(8, 8, buttons) : null
            }
          </ol>
          <ol className="touchpad">
            {
              gamePads ? this.buildButtons(17, 17, buttons) : null
            }
          </ol>
          <ol className="start">
            {
              gamePads ? this.buildButtons(9, 9, buttons) : null
            }
          </ol>
          <ol className="face">
            {
              gamePads ? this.buildButtons(0, 3, buttons) : null
            }
          </ol>
        </div>
        <div className="bottom">
          <ol className="l3">
            {
              gamePads ? this.buildButtons(10, 10, buttons) : null
            }
          </ol>
          <ol className="home">
            {
              gamePads ? this.buildButtons(16, 16, buttons) : null
            }
          </ol>
          <ol className="r3">
            {
              gamePads ? this.buildButtons(11, 11, buttons) : null
            }
          </ol>
        </div>
      </div>
    )
  }
}

function IndicateControllerConnection() {
  return (
    <div className="connected">
      <p>Connected:</p>
      <span>🕹️</span>
    </div>
  )
}

class Connected extends React.Component {
  constructor(props) {
    super(props);
    this.handleGamepadConnection = this.handleGamepadConnection.bind(this);
  }

  handleGamepadConnection() {
    window.addEventListener("gamepadconnected", this.props.onGamepadConnection);
    window.addEventListener("gamepaddisconnected", this.props.onGamepadConnection);
  }

  componentDidMount() {
    this.handleGamepadConnection();
  }

  render() {
    const connectionStatus = this.props.connectionStatus,
      gamePads = this.props.connectedPads ? this.props.connectedPads : null;

    return (
      <div className="connection">
        {
          gamePads[0] ?
            gamePads.map((pad) => {
              return (
                <IndicateControllerConnection
                  key={pad.index}
                  gamePads={gamePads}
                />
              )
            })
            : null
        }
        <p>Connection Status</p>
        <p>{connectionStatus}</p>
      </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStatus: "Gamepad not detected",
      connectedPads: [],
      buttons: []
    }
    this.handleGamepadConnection = this.handleGamepadConnection.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleGamepadConnection(e) {
    if (e.type === "gamepadconnected") {
      this.setState({
        connectionStatus: "Gamepad Connected",
      });
      this.prepGamepads();
    } else {
      this.setState({
        connectionStatus: "Gamepad Disconnected",
        connectedPads: navigator.getGamepads()
      });
    }
  }

  prepGamepads() {
    const pads = navigator.getGamepads(),
      arr1 = [],
      arr2 = [];
    for (let pad in pads) {
      if (pads[pad] && typeof pads[pad] === 'object') {
        arr1.push(pads[pad]);
        arr2.push(pads[pad]["buttons"])
      }
    }
    this.setState({
      connectedPads: arr1,
      buttons: arr2
    })
  }

  handleButtonPress() {
    this.prepGamepads();
    const updatedButtons = this.state.buttons ? [...this.state.buttons] : undefined;
    if (!updatedButtons) { return; }
    for (let button in updatedButtons[0]) {
      if (updatedButtons[0][button].pressed) {
        updatedButtons[0][button].className = "pressed"
      } else {
        updatedButtons[0][button].className = updatedButtons[0][button].className ? "not-pressed" : null
      }
    }
    this.setState({ buttons: updatedButtons });
    requestAnimationFrame(this.handleButtonPress);
  }

  componentDidMount() {
    this.handleButtonPress();
  }

  render() {
    const connectedPads = this.state.connectedPads ? this.state.connectedPads : null,
      connectionStatus = this.state.connectionStatus,
      buttons = this.state.buttons ? this.state.buttons : null;
    return (
      <div className="controller">
        <p>Controller</p>
        <Connected
          onGamepadConnection={this.handleGamepadConnection}
          connectedPads={connectedPads}
          connectionStatus={connectionStatus}
        />
        <Buttons
          connectedPads={connectedPads}
          buttons={buttons}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Controller />
      </header>
    </div>
  );
}

export default App;