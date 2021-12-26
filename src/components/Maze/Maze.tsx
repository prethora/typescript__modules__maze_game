import * as React from "react";
import { useState,useEffect,useRef } from "react";
import { mazeConfig } from "../../lib/config";
import { Coor, TMaze } from "../../lib/generate_maze";
import { genIndexes, getParameterByName } from "../../lib/misc";
import { TFadeState } from "../App/App";
import { Block } from "../Block/Block";
import { Lantern } from "../Lantern/Lantern";
import { Stats } from "../Stats/Stats";
import { GameOverOverlay } from "./GameOverOverlay/GameOverOverlay";
import styles from "./Maze.scss";

interface TProp
{
    width: number;
    height: number;
    size: number;    
    maze: TMaze;
    onRestart: () => void; 
    radius: number;
    lanternRadius: number;
    stepsPerMaze: number;
    lanternsPerMaze: number;
    show: boolean;
    onBackToStart: () => void;
    onFadedOut: () => void;
    gameNumber: number;
}

export function Maze({
    width,
    height,
    size,
    maze,
    onRestart,
    radius,
    lanternRadius,
    stepsPerMaze,
    lanternsPerMaze,
    show,
    onBackToStart,
    onFadedOut,
    gameNumber}: TProp)
{
    const { vertSep,horiSep } = maze;
    const isDark = (getParameterByName("dark")==="true");
    const [stepsLeft,setStepsLeft] = useState(stepsPerMaze);
    const [lanternsLeft,setLanternsLeft] = useState(lanternsPerMaze);
    const [lanterns,setLanterns] = useState<Coor[]>([]);
    const [wins,setWins] = useState(0);
    const [pos,setPos] = useState({y: 0,x: 0});
    // const [pos,setPos] = useState({y: height-1,x: width-1});
    const [hide,setHide] = useState(false);
    const [slow,setSlow] = useState(false);
    const [instant,setInstant] = useState(false);    
    const [gameOver,setGameOver] = useState(false);    
    const [gameOverFlash,setGameOverFlash] = useState(false);
    const perm = useRef({pos,vertSep,horiSep,stepsLeft,wins,lanterns,lanternsLeft,gameOver,gameOverFlash,backToStartCalled: false,show});
    perm.current.pos = pos;
    perm.current.vertSep = vertSep;
    perm.current.horiSep = horiSep;
    perm.current.stepsLeft = stepsLeft;    
    perm.current.wins = wins;        
    perm.current.lanterns = lanterns;    
    perm.current.lanternsLeft = lanternsLeft;       
    perm.current.gameOver = gameOver;           
    perm.current.gameOverFlash = gameOverFlash;    
    perm.current.show = show;        

    const fadeStateRef = useRef<TFadeState>("HIDDEN");

    const playerRef = useRef<HTMLDivElement>(null);

    const amOnLantern = () => 
    {
        const { pos,lanterns } = perm.current;
        return (lanterns.filter(({x,y}) => (x===pos.x) && (y===pos.y)).length===1);
    };

    const doGameOver = () => 
    {
        setGameOver(true);        
        gameOverFlashCounterRef.current = 0;
    };

    const consumeStep = () => 
    {
        const { stepsLeft } = perm.current;
        setStepsLeft(stepsLeft-1);
        if (stepsLeft===1)
        {
            doGameOver();            
        }
    };

    const incWins = () => 
    {
        const { wins } = perm.current;
        setWins(wins+1);
    };

    const dropLantern = () => 
    {
        const { lanternsLeft,pos,lanterns } = perm.current;
        if ((lanternsLeft>0) && (!amOnLantern()))
        {
            setLanterns([...lanterns,{x:pos.x,y:pos.y}]);
            setLanternsLeft(lanternsLeft-1);
        }
    };

    const preRestart = () => 
    {
        setPos({x: width-1,y: height});
        setHide(true);
        setSlow(true);
        setLanterns([]);
        setLanternsLeft(lanternsPerMaze);
    };

    const restart = () => 
    {
        setPos({x: 0,y: -1});
        setInstant(true);
        onRestart();
        setStepsLeft(stepsPerMaze);
        incWins();
    };

    useEffect(() =>
    {
        window.addEventListener("keydown",(e) => 
        {            
            if (perm.current.gameOver) 
            {
                const arrowKeys = ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];
                if (arrowKeys.indexOf(e.key)===-1)
                {
                    if (!perm.current.backToStartCalled)
                    {
                        gameOverFlashCounterRef.current = -1;                    
                        perm.current.backToStartCalled = true;
                        onBackToStart();
                    }                    
                }
                return;
            }

            if ((fadeStateRef.current=="FADING-OUT") || (fadeStateRef.current=="HIDDEN")) return;

            const {x,y} = perm.current.pos;
            const { vertSep,horiSep } = perm.current;
            if (e.key==="ArrowRight")
            {                
                if ((x<width-1) && (!vertSep[y][x+1])) 
                {
                    setPos({x: x+1,y: y});
                    consumeStep();
                }
            }
            if (e.key==="ArrowLeft")
            {
                if ((x>0) && (!vertSep[y][x])) 
                {
                    setPos({x: x-1,y: y});
                    consumeStep();
                }
            }
            if (e.key==="ArrowUp")
            {
                if ((y>0) && (!horiSep[y][x])) 
                {
                    setPos({x: x,y: y-1});
                    consumeStep();
                }
            }
            if (e.key==="ArrowDown")
            {
                if ((x===width-1) && (y===height-1))
                {
                    preRestart();
                }
                else if ((y<height-1) && (!horiSep[y+1][x])) 
                {
                    setPos({x: x,y: y+1});
                    consumeStep();
                }
            }
            if (e.key===" ")
            {
                dropLantern();
            }
        });

        if (playerRef.current)
        {
            playerRef.current.addEventListener("transitionend",(e) => 
            {
                if (e.target===playerRef.current)
                {
                    if (e.propertyName==="opacity")
                    {                    
                        const currentValue = parseInt(getComputedStyle(playerRef.current!).opacity);
                        if (currentValue===0)
                        {
                            restart();
                        }                    
                    }
                    if (e.propertyName==="top")
                    {
                        const { x,y } = perm.current.pos;
                        if ((x===0) && (y===0))
                        {
                            setSlow(false);
                        }
                    }    
                }
            });
        }
    },[])

    const unfoggedHandler = () => 
    {
        const { x,y } = perm.current.pos;
        if ((x===0) && (y===-1))
        {
            setPos({x: 0,y: 0});
            setHide(false);
            setInstant(false);    
        }
    };

    const rows = genIndexes(height).map((y) => 
    {
        return (<div key={"row-"+y} className={styles.row}>
            {genIndexes(width).map((x) => (<Block 
                    key={x}
                    size={size} 
                    x={x} 
                    y={y} 
                    posx={pos.x}
                    posy={pos.y}
                    width={width} 
                    height={height} 
                    vertSep={vertSep} 
                    horiSep={horiSep} 
                    radius={radius} 
                    onUnfogged={unfoggedHandler}
                    lanterns={lanterns}
                    lanternRadius={lanternRadius}
                />))}
        </div>)
    });

    const playerStyles = [styles.player];
    if (hide) playerStyles.push(styles.hide);
    if (slow) playerStyles.push(styles.slow);    
    if (instant) playerStyles.push(styles.instant);

    const lanternComps = lanterns.map(({x,y},index) => <Lantern key={"lantern-"+index} size={size} x={x} y={y} />);

    const refFrame = useRef<HTMLDivElement>(null);

    useEffect(() => 
    {
        if (refFrame.current)
        {
            refFrame.current.addEventListener("transitionstart",(e) => 
            {
                if ((e.target===refFrame.current) && (e.propertyName==="opacity"))
                {
                    if (perm.current.show)
                    {
                        fadeStateRef.current = "FADING-IN";
                    }
                    else
                    {
                        fadeStateRef.current = "FADING-OUT";
                    }
                }
            });
            refFrame.current.addEventListener("transitionend",(e) => 
            {                                
                if ((e.target===refFrame.current) && (e.propertyName==="opacity"))
                {
                    if (getComputedStyle(refFrame.current!).opacity==="0")
                    {
                        fadeStateRef.current = "HIDDEN";
                        setGameOver(false);
                        onFadedOut();
                    }
                    else
                    {
                        fadeStateRef.current = "VISIBLE";
                    }                    
                }
            });
        }
    },[]);

    useEffect(() => 
    {
        if (gameNumber>0)
        {
            perm.current.backToStartCalled = false;
            setGameOverFlash(false);
            setLanterns([]);
            setLanternsLeft(lanternsPerMaze);
            setStepsLeft(stepsPerMaze);
            setWins(0);
            setPos({x: 0,y: 0});
        }
    },[gameNumber]);    

    const gameOverOverlayFadedInHandler = () => 
    {
        setGameOverFlash(true);
    };

    const gameOverFlashCounterRef = useRef(0);

    const gameOverFlashes = mazeConfig.gameOverFlashCount;

    const gameOverOverlayTextFadedEitherHandler = () => 
    {
        if (gameOverFlashCounterRef.current===-1) return;

        const { gameOverFlash } = perm.current;
        const next = () => setGameOverFlash(!perm.current.gameOverFlash);
        if (gameOverFlash)
        {
            gameOverFlashCounterRef.current++;
            if (gameOverFlashCounterRef.current===gameOverFlashes)
            {
                perm.current.backToStartCalled = true;
                onBackToStart();
            }
            setTimeout(next,150);
        }
        else
        {
            if ((gameOverFlashCounterRef.current<gameOverFlashes) || (gameOverFlashes===-1))
            {
                next();
            }
        }
    };    

    return (
        <div ref={refFrame} className={styles.frame+" "+(show?styles.show:"")}>
            <div className={styles.maze+" "+(isDark?"dark":"")}>
                {rows}
                <div ref={playerRef} className={playerStyles.join(" ")} style={{left: `${pos.x*(size+2)}px`,top: `${pos.y*(size+2)}px`}}></div>
                {lanternComps}
                <GameOverOverlay 
                    gameOverFlash={gameOverFlash} 
                    show={gameOver} 
                    onFadedIn={gameOverOverlayFadedInHandler}
                    onTextFadedEither={gameOverOverlayTextFadedEitherHandler}
                />
            </div>
            <Stats gameOverFlash={gameOverFlash} gameOver={gameOver} stepsLeft={stepsLeft} wins={wins} lanternsLeft={lanternsLeft} lanternsPerMaze={lanternsPerMaze} />
        </div>
    );
}
