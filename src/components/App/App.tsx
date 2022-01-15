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
import { startupEvents } from "../../lib/startup_events";

export type Coor = {y: number,x: number};
type TGameState = "STARTSCREEN" | "MAZE" | "GAMEOVER" | "BLANK";

export type TFadeState = "VISIBLE" | "HIDDEN" | "FADING-IN" | "FADING-OUT";

export function App()
{
    // The maze dimensions are hard coded here    
    const width = 20;
    const height = 20;

    // Loading the
    const { 
        playerVisibilityRadius,
        lanternVisibilityRadius,
        stepsPerMaze,
        lanternsPerMaze 
    } = mazeConfig;
    
    const [gameState,setGameState] = useState<TGameState>("BLANK");

    const [gameNumber,setGameNumber] = useState(0);
    const [maze,setMaze] = useState(generateMaze(width,height));
    const [durationSwitched,setDurationSwitched] = useState(true);
    const perm = useRef({gameState,gameNumber});
    perm.current.gameState = gameState;
    perm.current.gameNumber = gameNumber;    

    const startScreenFadeStateRef = useRef<TFadeState>("HIDDEN");
    
    const restartHandler = () => 
    {
        setMaze(generateMaze(width,height));
    };

    useEffect(() => 
    {
        window.addEventListener("keydown",(e) => 
        {
            const { gameState } = perm.current;
            if ((gameState==="STARTSCREEN") && ((startScreenFadeStateRef.current==="FADING-IN") || (startScreenFadeStateRef.current==="VISIBLE")))
            {
                setDurationSwitched(false);
                startScreenFadeStateRef.current = "FADING-OUT";
                setGameState("BLANK");
            }
        });

        startupEvents.registerCallback(() => 
        {
            const _window: any = window;
            _window.__loader.endAnimation(() => 
            {
                setGameState("STARTSCREEN");
            });
        });

        setTimeout(() => 
        {
            startupEvents.registerEvent();
        },2000);

        if (document.fonts)
        {
            document.fonts.ready.then(function() 
            {            
                startupEvents.registerEvent();
            });    
        }
        else
        {
            setTimeout(() => 
            {
                startupEvents.registerEvent();
            },1500);
        }
    },[]);

    const startScreenStartedFadedInHandler = () => 
    {
        startScreenFadeStateRef.current = "FADING-IN";
    };

    const startScreenStartedFadedOutHandler = () => 
    {
        startScreenFadeStateRef.current = "FADING-OUT";
    };

    const startScreenFadedOutHandler = () => 
    {
        startScreenFadeStateRef.current = "HIDDEN";
        setGameState("MAZE");        
    };

    const startScreenFadedInHandler = () => 
    {
        startScreenFadeStateRef.current = "VISIBLE";
        setDurationSwitched(false);
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
                onStartedFadeOut={startScreenStartedFadedOutHandler}                
            />
        </div>
    );
}