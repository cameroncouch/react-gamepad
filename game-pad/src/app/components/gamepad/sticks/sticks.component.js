import React from "react"
import { Component } from "react"
import styles from "./sticks-styles.css"
//set up class
export class Sticks extends Component {
    //render
    render() {
        return (
            <div>
                <p>Sticks</p>
                <>
                    {(
                        <div>
                            {this.props.sticks ?
                                (
                                    <div className={styles.sticks}>
                                        <div className={styles.stickLeft}>
                                            <div className={styles.quadrantTopLeft}> </div>
                                            <div className={styles.quadrantTopRight}> </div>
                                            <div
                                                key={0}
                                                //id={`${(idx + 1) % 2 === 0 ? "Y" : "X"}`}
                                                style={{ transform: `translate(${(this.props.sticks[0] * 20).toFixed(2)}px,${(this.props.sticks[1] * 20)}px)` }}
                                                className={styles.leftCoords}
                                            >
                                                ◉
                                            </div>
                                            <div className={styles.quadrantBottomRight}> </div>
                                            <div className={styles.quadrantBottomLeft}> </div>
                                        </div>
                                        <div className={styles.coords}>
                                            <p>{`X:${(this.props.sticks[0]).toFixed(2)}`}</p>
                                            <p>{`Y:${(this.props.sticks[1]).toFixed(2)}`}</p>
                                        </div>

                                        <div className={styles.stickRight}>
                                            <div className={styles.quadrantTopLeft}> </div>
                                            <div className={styles.quadrantTopRight}> </div>
                                            <div
                                                key={0}
                                                //id={`${(idx + 1) % 2 === 0 ? "Y" : "X"}`}
                                                style={{ transform: `translate(${(this.props.sticks[2] * 20).toFixed(2)}px,${(this.props.sticks[3] * 20).toFixed(2)}px)` }}
                                                className={styles.rightCoords}
                                            >
                                                ◉
                                            </div>
                                            <div className={styles.quadrantBottomRight}> </div>
                                            <div className={styles.quadrantBottomLeft}> </div>
                                        </div>
                                        <div className={styles.coords}>
                                            <p>{`X:${(this.props.sticks[2]).toFixed(2)}`}</p>
                                            <p>{`Y:${(this.props.sticks[3]).toFixed(2)}`}</p>
                                        </div>
                                    </div>
                                )
                                : ''
                            }
                        </div>
                    )}
                </>
            </div>
        )
    }
}