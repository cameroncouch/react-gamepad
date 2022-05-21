import React from 'react'
import { Component } from 'react'
import { Connected } from './connection/connection.component';
import { Buttons } from './buttons/buttons.component';
import styles from './gamepad-styles.css';

export class Gamepad extends Component {
    _isMounted = false;
    _currentAnimationFrame;

    constructor(props) {
        super(props);
        this.state = {
            chosenController: '0',
            connectionStatus: "Gamepad not detected. Press any button on your gamepad, or connect a gamepad!",
            connectedPads: [],
            buttons: []
        }
        this.handleGamepadConnection = this.handleGamepadConnection.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleChosenController = this.handleChosenController.bind(this);
    }

    handleGamepadConnection(e) {
        if(this._isMounted) {
            if (e.type === "gamepadconnected") {
                this.setState({
                    connectionStatus: "Gamepad Connected",
                    chosenController: e.gamepad.index
                });
                this.prepGamepads();
            } else {
                this.setState({
                    connectionStatus: "Gamepad Disconnected",
                    connectedPads: this.state.connectedPads.splice(e.gamepad.index, 1),
                    chosenController: this.state.connectedPads.findIndex(pad => !!pad)
                });
                console.log(this.state.chosenController);
                this.prepGamepads();
            }
        }
    }

    handleChosenController(e) {
        if(this._isMounted) {
            this.setState({
                chosenController: e.target.value
            })
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
        if(this._isMounted) {
            this.setState({
                connectedPads: arr1,
                buttons: arr2
            })
        }
    }

    handleButtonPress() {
        if (this.state.connectionStatus === "Gamepad Disconnected") {
            cancelAnimationFrame(this._currentAnimationFrame);
        }
        this.prepGamepads();
        const updatedButtons = this.state.buttons ? [...this.state.buttons] : undefined;
        if (!updatedButtons) { return; }
        for (let button in updatedButtons[this.state.chosenController]) {
            if (updatedButtons[this.state.chosenController][button].pressed) {
                updatedButtons[this.state.chosenController][button].className = styles.pressed
            } else {
                updatedButtons[this.state.chosenController][button].className = updatedButtons[this.state.chosenController][button].className ? styles["not-pressed"] : null
            }
        }
        if(this._isMounted) { this.setState({ buttons: updatedButtons }); }
        this._currentAnimationFrame = requestAnimationFrame(this.handleButtonPress);
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) { this.handleButtonPress(); }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const connectedPads = this.state.connectedPads ? this.state.connectedPads : null,
            connectionStatus = this.state.connectionStatus,
            buttons = this.state.buttons ? this.state.buttons : null,
            chosenController = this.state.chosenController;
        return (
            <div className={styles.controller}>
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