import * as React from "react";
import { useState } from "react";
import styles from "./Block.scss";

interface TProp
{
    size: number;
    x: number;
    y: number;
    width: number;
    height: number;
    vertSep: boolean[][];
    horiSep: boolean[][];
}

export function Block({size,x,y,width,height,vertSep,horiSep}: TProp)
{
    const [counter,setCounter] = useState(0);

    const { block,left,right,top,bottom } = styles;

    const bs = [block];
    if (vertSep[y][x]) bs.push(left);
    if (horiSep[y][x]) bs.push(top);
    if ((x==width-1) && (vertSep[y][x+1])) bs.push(right);
    if ((y==height-1) && (horiSep[y+1][x])) bs.push(bottom);

    return (
        <div className={bs.join(" ")} style={{width: `${size}px`,height: `${size}px`}}></div>
    );
}
