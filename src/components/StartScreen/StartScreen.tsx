import * as React from "react";
import { useState,useEffect,useRef } from "react";
import styles from "./StartScreen.scss";

interface TProp
{
    show: boolean;
    onFadedOut: () => void;
    onFadedIn: () => void;
    onStartedFadeIn?: () => void;
    onStartedFadeOut?: () => void;
}

export function StartScreen({show,onFadedOut,onFadedIn,onStartedFadeIn,onStartedFadeOut}: TProp)
{
    const [flash,setFlash] = useState(false);
    const perm = useRef({flash,show});
    perm.current.flash = flash;
    perm.current.show = show;

    const fsy = [styles.frame];
    if (show) fsy.push(styles.show);

    const asy = [styles.action];
    if (flash) asy.push(styles.flash);

    const refFrame = useRef<HTMLDivElement>(null);
    const refAction = useRef<HTMLDivElement>(null);

    useEffect(() => 
    {
        setFlash(true);
        if (refAction.current)
        {
            refAction.current.addEventListener("transitionend",(e) => 
            {
                if (e.target===refAction.current)
                {
                    setFlash(!perm.current.flash);
                }                
            });
        }
        if (refFrame.current)
        {
            refFrame.current.addEventListener("transitionstart",(e) => 
            {
                if ((e.target===refFrame.current) && (e.propertyName==="opacity"))
                {
                    if (perm.current.show)
                    {
                        if (onStartedFadeIn) onStartedFadeIn();
                    }
                    else
                    {
                        if (onStartedFadeOut) onStartedFadeOut();
                    }
                }
            });
            refFrame.current.addEventListener("transitionend",(e) => 
            {                
                if ((e.target===refFrame.current) && (e.propertyName==="opacity"))
                {
                    if (getComputedStyle(refFrame.current!).opacity==="0")
                    {
                        onFadedOut();
                    }
                    else 
                    {
                        onFadedIn();
                    }
                }
            });
        }
    },[]);

    return (
        <div ref={refFrame} className={fsy.join(" ")}>
            <div className={styles.middleText}>
                <div className={styles.title}>
                    ESCAPE THE ABYSS
                </div>
                <div ref={refAction} className={asy.join(" ")}>
                    press any key to start...
                </div>
            </div>
            <div className={styles.controls}>
                <i className="icon-up-big" />
                <i className="icon-down-big" />
                <i className="icon-left-big" />
                <i className="icon-right-big" />                
                = MOVE &nbsp;&nbsp;&nbsp;&nbsp; <i className="icon-myspace" /> = DROP LANTERN
            </div>
        </div>
    );
}
