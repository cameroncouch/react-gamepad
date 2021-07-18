import React from "react";

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
  render() {
    return (
      <div className="buttons">
        <p>Buttons</p>
        <p>{this.props.someProp}</p>
      </div>
    )
  }
}

class Connected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: "Gamepad not detected"
    }
    this.handleGamepadConnection = this.handleGamepadConnection.bind(this);
  }

  handleGamepadConnection(e) {
    e.type === "gamepadconnected"
      ?
      this.setState({
        connected: "Gamepad Connected"
      })
      :
      this.setState({
        connected: "Gamepad Disconnected"
      });
  }

  componentDidMount() {
    window.addEventListener("gamepadconnected", this.handleGamepadConnection);
    window.addEventListener("gamepaddisconnected", this.handleGamepadConnection);
  }

  render() {
    return (
      <div className="connected">
        <p>Connection Status</p>
        <p>{this.state.connected}</p>
        <p>{this.props.someProp}</p>
      </div>
    );
  }

}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // some state
    }
  }
  render() {
    return (
      <div className="controller">
        <p>Controller</p>
        <Connected someProp={"Test prop from controller(parent)"} />
        <Buttons someProp={"Test prop from controller(parent)"} />
        <ButtonPresses someProp={"Test prop from controller(parent)"} />
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
