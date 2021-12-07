import * as React from "react";
import { useState,useEffect,useRef } from "react";
import styles from "./Stats.scss";
import lanternSrc from "./resources/lantern.svg";
import mazeLanternBlackSrc from "../Lantern/resources/lantern.svg";
import mazeLanternWhiteSrc from "../Lantern/resources/lantern-white.svg";
import { startupEvents } from "../../lib/startup_events";

interface TProp
{
    stepsLeft: number;
    wins: number;
    lanternsLeft: number;
    lanternsPerMaze: number;
    gameOver: boolean;
    gameOverFlash: boolean;
}

export function Stats({stepsLeft,wins,lanternsLeft,lanternsPerMaze,gameOver,gameOverFlash}: TProp)
{
    const csy = [styles.container];
    if (gameOver) csy.push(styles.gameOver);
    if (gameOverFlash) csy.push(styles.flash);

    const lanternLoadHandler = () => 
    {
        startupEvents.registerEvent();
    };

    return (
        <div className={csy.join(" ")}>
            <div className={styles.row+" "+styles.steps}>
                <div className={styles.icon}>
                    <i className={"icon-fontello_stairs "+styles.stairs} />
                </div>
                <div className={styles.counter}>
                    {stepsLeft}
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.icon}>
                    <img src={lanternSrc} className={styles.lantern} onLoad={lanternLoadHandler} />
                </div>
                <div className={styles.counter}>
                    {lanternsLeft}/{lanternsPerMaze}
                </div>                
            </div>            
            <div className={styles.sep}></div>
            <div className={styles.row+" "+styles.wins}>
                <div className={styles.icon}>
                    <i className={"icon-award "+styles.cup} />
                </div>
                <div className={styles.counter}>
                    {wins}
                </div>                
            </div>
            <div>
                <img className={styles.hiddenImage} src={mazeLanternBlackSrc} onLoad={lanternLoadHandler} />
                <img className={styles.hiddenImage} src={mazeLanternWhiteSrc} onLoad={lanternLoadHandler} />
            </div>            
        </div>
    );
}
