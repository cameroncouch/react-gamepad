import { Component } from 'react'
import { Connected } from './connection/connection.component';
import { Buttons } from './buttons/buttons.component';

export class Gamepad extends Component {
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