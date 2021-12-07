import * as React from "react";
import { useState,useEffect,useRef } from "react";
import { generateMaze } from "../../lib/generate_maze";
import { genIndexes, getParameterByName } from "../../lib/misc";
import { Maze } from "../Maze/Maze";

import styles from "./App.scss";
import "./resources/fonts/stylesheet.css";
import "./resources/fonts/fontello/css/fontello.css";
import { StartScreen } from "../StartScreen/StartScreen";
import { mazeConfig } from "../../lib/config";

export type Coor = {y: number,x: number};
type TGameState = "STARTSCREEN" | "MAZE" | "GAMEOVER" | "BLANK";

export function App()
{
    const width = 20;
    const height = 20;
    const { 
        playerVisibilityRadius,
        lanternVisibilityRadius,
        stepsPerMaze,
        lanternsPerMaze 
    } = mazeConfig;
    
    const [gameState,setGameState] = useState<TGameState>("STARTSCREEN");    

    console.log("gameState",gameState);

    const [gameNumber,setGameNumber] = useState(0);
    const [maze,setMaze] = useState(generateMaze(width,height));
    const [durationSwitched,setDurationSwitched] = useState(false);
    const perm = useRef({gameState,gameNumber,startScreenIsFadedIn: true});
    perm.current.gameState = gameState;
    perm.current.gameNumber = gameNumber;    
    
    const restartHandler = () => 
    {
        setMaze(generateMaze(width,height));
    };

    useEffect(() => 
    {
        window.addEventListener("keydown",(e) => 
        {
            console.log("BO 1");
            const { gameState } = perm.current;
            if ((gameState==="STARTSCREEN") && (perm.current.startScreenIsFadedIn))
            {
                console.log("BO 2");
                setDurationSwitched(false);
                perm.current.startScreenIsFadedIn = false;
                setGameState("BLANK");
            }
        });
    },[]);

    const startScreenStartedFadedInHandler = () => 
    {

    };

    const startScreenFadedOutHandler = () => 
    {
        setGameState("MAZE");
    };

    const startScreenFadedInHandler = () => 
    {
        perm.current.startScreenIsFadedIn = true;
    };

    const mazeFadedOutHandler = () => 
    {
        setGameState("STARTSCREEN");
        restartHandler();        
        setGameNumber(perm.current.gameNumber+1);
    };

    const backToStartHandler = () => 
    {
        setDurationSwitched(true);
        setGameState("BLANK");
    };

    return (
        <div className={durationSwitched?"durationSwitch":""}>
            <div className={styles.framev}>
                <div className={styles.frameh}>
                    <Maze 
                        width={20} 
                        height={20} 
                        size={26} 
                        stepsPerMaze={stepsPerMaze}
                        lanternsPerMaze={lanternsPerMaze}
                        radius={playerVisibilityRadius} 
                        lanternRadius={lanternVisibilityRadius}
                        maze={maze}
                        onRestart={restartHandler} 
                        show={gameState==="MAZE"}
                        onBackToStart={backToStartHandler}
                        onFadedOut={mazeFadedOutHandler}
                        gameNumber={gameNumber}
                    />
                </div>
            </div>
            <StartScreen 
                show={gameState==="STARTSCREEN"} 
                onFadedOut={startScreenFadedOutHandler}
                onFadedIn={startScreenFadedInHandler}
                onStartedFadeIn={startScreenStartedFadedInHandler}
            />
        </div>
    );
}