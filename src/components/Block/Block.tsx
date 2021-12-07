import * as React from "react";
import { useState,useRef,useEffect } from "react";
import { Coor } from "../../lib/generate_maze";
import styles from "./Block.scss";

interface TProp
{
    size: number;
    x: number;
    y: number;
    posx: number;
    posy: number;
    width: number;
    height: number;
    radius: number;
    vertSep: boolean[][];
    horiSep: boolean[][];
    onUnfogged: () => void;
    lanterns: Coor[];
    lanternRadius: number;
}

export function Block({size,x,y,width,height,vertSep,horiSep,radius,posx,posy,onUnfogged,lanterns,lanternRadius}: TProp)
{
    const [counter,setCounter] = useState(0);

    const { block,left,right,top,bottom,fog,fogRight,fogBottom,fogged } = styles;

    const bs = [block];
    if (vertSep[y][x]) bs.push(left);
    if (horiSep[y][x]) bs.push(top);
    if ((x==width-1) && (vertSep[y][x+1])) bs.push(right);
    if ((y==height-1) && (horiSep[y+1][x])) bs.push(bottom);
    if (x==width-1) bs.push(fogRight);
    if (y==height-1) bs.push(fogBottom);
    const sources: {dx: number,dy: number,radius: number}[] = [];
    const dx = Math.abs(posx-x);
    const dy = Math.abs(posy-y);    
    sources.push({dx,dy,radius});
    sources.push(...lanterns.map(({x: lx,y: ly}) => ({dx: Math.abs(lx-x),dy: Math.abs(ly-y),radius: lanternRadius})));
    if (sources.filter(({dx,dy,radius}) => ((dx<radius) && (dy<radius))).length===0) bs.push(fogged);

    if (x===0) bs.push(styles.edgeLeft);
    if (x===width-1) bs.push(styles.edgeRight);
    if (y===0) bs.push(styles.edgeTop);
    if (y===height-1) bs.push(styles.edgeBottom);

    const exProps: {[name: string]: any} = {};

    if ((x===0) && (y===0))
    {
        const ref = useRef<HTMLDivElement>(null);
        exProps["ref"] = ref;

        useEffect(() => 
        {
            if (ref.current)
            {
                ref.current.addEventListener("transitionend",(e) => 
                {                    
                    if ((e.target===ref.current) && (e.propertyName==="opacity"))
                    {
                        const currentValue = parseInt(getComputedStyle(ref.current!).opacity);
                        if (currentValue===0)
                        {
                            onUnfogged();
                        }
                    }
                });
            }
        },[]);
    }

    return (
        <div className={bs.join(" ")} style={{width: `${size}px`,height: `${size}px`}}>
            <div {...exProps} className={fog}></div>
            {((x===0) && (y===0))?(<div className={styles.topOpening}></div>):null}
            {((x===width-1) && (y===height-1))?(<div className={styles.bottomOpening}></div>):null}
        </div>
    );
}
