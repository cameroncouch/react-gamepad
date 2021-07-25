import React from "react";
import './App.css'

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //some state
    }
    this.buildButtons = this.buildButtons.bind(this);
  }

  buildButtons(start, stop, buttons) {
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

  render() {
    const buttons = this.props.buttons.length > 0 ? this.props.buttons : null,
      chosenController = this.props.chosenController >= 0 ? this.props.chosenController : null;
    return buttons ? (
      <div className="buttons">
        <div className="top">
          <ol className="bumpers">
            {
              buttons ? this.buildButtons(4, 5, buttons[chosenController]) : null
            }
          </ol>
          <ol className="triggers">
            {
              buttons ? this.buildButtons(6, 7, buttons[chosenController]) : null
            }
          </ol>
        </div>
        <div className="middle">
          <ol className="dpad">
            {
              buttons ? this.buildButtons(12, 15, buttons[chosenController]) : null
            }
          </ol>
          <ol className="select">
            {
              buttons ? this.buildButtons(8, 8, buttons[chosenController]) : null
            }
          </ol>
          <ol className="touchpad">
            {
              buttons ? this.buildButtons(17, 17, buttons[chosenController]) : null
            }
          </ol>
          <ol className="start">
            {
              buttons ? this.buildButtons(9, 9, buttons[chosenController]) : null
            }
          </ol>
          <ol className="face">
            {
              buttons ? this.buildButtons(0, 3, buttons[chosenController]) : null
            }
          </ol>
        </div>
        <div className="bottom">
          <ol className="l3">
            {
              buttons ? this.buildButtons(10, 10, buttons[chosenController]) : null
            }
          </ol>
          <ol className="home">
            {
              buttons ? this.buildButtons(16, 16, buttons[chosenController]) : null
            }
          </ol>
          <ol className="r3">
            {
              buttons ? this.buildButtons(11, 11, buttons[chosenController]) : null
            }
          </ol>
        </div>
      </div>
    )
    : '';
  }
}

function IndicateControllerConnection(props) {
  return (
    <div className="connected">
      <button
        value={props.value}
        onClick={props.onChosenController}
      >
        Test 🎮 #{ props.value } 
      </button>
    </div>
  )
}

class Connected extends React.Component {
  constructor(props) {
    super(props);
    this.listenForGamepadConnection = this.listenForGamepadConnection.bind(this);
  }

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
      <div className="connection">
        {
          gamePads[0] ?
            gamePads[0].connected ?
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
              : null : null
        }
        <p>Connection Status</p>
        <p>{connectionStatus}</p>
        {this.props.chosenController ? <p>Testing gamepad #{this.props.chosenController}</p> : ''}
      </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenController: 0,
      connectionStatus: "Gamepad not detected. Press any button on your gamepad, or connect a gamepad!",
      connectedPads: [],
      buttons: []
    }
    this.handleGamepadConnection = this.handleGamepadConnection.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleChosenController = this.handleChosenController.bind(this);
  }

  handleGamepadConnection(e) {
    if (e.type === "gamepadconnected") {
      this.setState({
        connectionStatus: "Gamepad Connected",
        chosenController: e.gamepad.index
      });
      this.prepGamepads();
    } else {
      this.setState({
        connectionStatus: "Gamepad Disconnected",
        chosenController: this.state.connectedPads.findIndex(pad => !!pad)
      });
      this.prepGamepads();
      console.log(this.state.chosenController);
    }
  }

  handleChosenController(e) {
    this.setState({
      chosenController: e.target.value
    })
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
    for (let button in updatedButtons[this.state.chosenController]) {
      if (updatedButtons[this.state.chosenController][button].pressed) {
        updatedButtons[this.state.chosenController][button].className = "pressed"
      } else {
        updatedButtons[this.state.chosenController][button].className = updatedButtons[this.state.chosenController][button].className ? "not-pressed" : null
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
      buttons = this.state.buttons ? this.state.buttons : null,
      chosenController = this.state.chosenController;
    return (
      <div className="controller">
        <p>Controller</p>
        <Connected
          onGamepadConnection={this.handleGamepadConnection}
          handleChosenController={this.handleChosenController}
          chosenController={chosenController}
          connectedPads={connectedPads}
          connectionStatus={connectionStatus}
        />
        <Buttons
          connectedPads={connectedPads}
          buttons={buttons}
          chosenController={chosenController}
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