import * as React from "react";
import { useEffect,useRef } from "react";
import styles from "./GameOverOverlay.scss";

interface TProp
{
    show: boolean;
    gameOverFlash: boolean;
    onFadedIn: () => void;
    onTextFadedEither: () => void;
}

export function GameOverOverlay({show,gameOverFlash,onFadedIn,onTextFadedEither}: TProp)
{
    const fvsy = [styles.framev];
    if (show) fvsy.push(styles.show);
    if (gameOverFlash) fvsy.push(styles.flash);

    const refFrameV = useRef<HTMLDivElement>(null);
    const refFrameH = useRef<HTMLDivElement>(null);

    useEffect(() => 
    {
        if (refFrameV.current)
        {
            refFrameV.current.addEventListener("transitionend",(e) => 
            {                
                if ((e.target===refFrameV.current) && (e.propertyName==="opacity") && (getComputedStyle(refFrameV.current!).opacity==="1"))
                {
                    onFadedIn();
                }
                if (e.target===refFrameH.current)
                {
                    onTextFadedEither();
                }
            });
        }
    },[]);

    return (
        <div ref={refFrameV} className={fvsy.join(" ")}>
            <div ref={refFrameH} className={styles.frameh}>
                GAME OVER
            </div>
        </div>
    );
}
