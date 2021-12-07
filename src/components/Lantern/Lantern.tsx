import * as React from "react";
import { useState } from "react";
import styles from "./Lantern.scss";
import lanternBlackSrc from "./resources/lantern.svg";
import lanternWhiteSrc from "./resources/lantern-white.svg";
import { getParameterByName } from "../../lib/misc";

interface TProp
{
    x: number;
    y: number;
    size: number;
}

export function Lantern({x,y,size}: TProp)
{
    const [counter,setCounter] = useState(0);
    const isDark = (getParameterByName("dark")==="true");

    const lanternSrc = isDark?lanternWhiteSrc:lanternBlackSrc;

    return (
        <div className={styles.container} style={{left: `${x*(size+2)}px`,top: `${y*(size+2)}px`}}>
            <img src={lanternSrc} className={styles.lantern}/>
        </div>
    );
}
