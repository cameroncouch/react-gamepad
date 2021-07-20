import React from "react";
import './App.css'

class ButtonPresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //some state
    }
  }
  render() {
    return (
      <div className="button-presses">
        <p>Inputs</p>
        <p>{this.props.someProp}</p>
        <div className="press-box"></div>
      </div>
    )
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //some state
    }
  }

  //function to check for button pressed
  styleButton() {
    console.log('Button Pressed');
  }

  checkButtonPresses() {
    //functionality to check if a button has been pressed, should be on requestAnimationFrame
  }
  
  componentDidMount() {
    //initial call to checkButtonPresses
    this.checkButtonPresses();
  }
  
  buildButtons(buttons) {
    return buttons.map(
      (button, idx) => {
        return (
          <p 
            key={idx}
            value={button.value}
          >
            {"BUTTON" + idx + button.pressed}
          </p>
        )
      }
    )
  }

  render() {
    const gamePads = this.props.connectedPads ? prepGamepads(this.props.connectedPads) : null;
    return (
      <div className="buttons">
        <p>Buttons</p>
        {
          gamePads ? this.buildButtons(gamePads[0]["buttons"]) : null
        }
        <p>{this.props.someProp}</p>
      </div>
    )
  }
}

function IndicateControllerConnection() {
  return (
    <div className="connected">
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
      gamePads = prepGamepads(this.props.connectedPads);

    return (
      <div className="connection">
        {
          gamePads ?
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
        <p>{this.props.someProp}</p>
      </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStatus: "Gamepad not detected",
      connectedPads: undefined
    }
    this.handleGamepadConnection = this.handleGamepadConnection.bind(this);
  }

  handleGamepadConnection(e) {
    if (e.type === "gamepadconnected") {
      this.setState({
        connectionStatus: "Gamepad Connected",
        connectedPads: navigator.getGamepads()
      });
    } else {
      this.setState({
        connectionStatus: "Gamepad Disconnected",
        connectedPads: navigator.getGamepads()
      });
    }
  }

  render() {
    const connectedPads = this.state.connectedPads,
      connectionStatus = this.state.connectionStatus;

    return (
      <div className="controller">
        <p>Controller</p>
        <Connected
          someProp={"Test prop from controller(parent)"}
          onGamepadConnection={this.handleGamepadConnection}
          connectedPads={connectedPads}
          connectionStatus={connectionStatus}
        />
        <Buttons
          someProp={"Test prop from controller(parent)"}
          connectedPads={connectedPads}
        />
        <ButtonPresses
          someProp={"Test prop from controller(parent)"}
          connectedPads={connectedPads}
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

function prepGamepads(pads) {
  let arr = [];
  for (let pad in pads) {
    if (pads[pad] && typeof pads[pad] === 'object') {
      arr.push(pads[pad]);
    }
  }
  return arr;
}

export default App;