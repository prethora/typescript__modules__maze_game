import * as React from "react";
import { useState } from "react";
import { genIndexes } from "../../lib/misc";
import { Block } from "../Block/Block";
import styles from "./Maze.scss";

interface TProp
{
    width: number;
    height: number;
    size: number;    
}

type Coor = {y: number,x: number};

export function Maze({width,height,size}: TProp)
{
    const [counter,setCounter] = useState(0);

    const vertSep = genIndexes(height).map((y) => 
    {
        return genIndexes(width+1).map((x) => x==x);
    });

    const horiSep = genIndexes(height+1).map((y) => 
    {
        return genIndexes(width).map((x) => x==x);
    });

    
    const selectedGrid = genIndexes(height).map(y => genIndexes(width).map(x => x!=x));
    const potentialGrid = genIndexes(height).map(y => genIndexes(width).map(x => x!=x));
    const selecteds: number[] = [];
    selectedGrid[0][0] = true;
    let selectedCount = 1;
    let total = width*height;
    const potentials: Coor[] = [{y: 1,x: 0},{y: 0,x: 1}];
    potentialGrid[1][0] = true;
    potentialGrid[0][1] = true;
    const deltas: Coor[] = [{y: 1,x: 0},{y: -1,x: 0},{y: 0,x: 1},{y: 0,x: -1}];

    const isSelected = (y: number,x: number) => 
    {
        if ((x<0) || (y<0) || (x>width-1) || (y>height-1)) return null;
        return selectedGrid[y][x];
    };

    while(selectedCount<total)
    {
        const index = Math.floor(Math.random()*potentials.length);
        const {y,x} = potentials[index];
        potentials.splice(index,1);
        const parents: Coor[] = []
        deltas.forEach(({y:dy,x:dx}) => 
        {            
            const parent = {y: y+dy,x: x+dx};
            const sel = isSelected(parent.y,parent.x);
            if (sel)
            {
                parents.push(parent);
            }
            else if (sel===false)
            {
                if (!potentialGrid[parent.y][parent.x])
                {
                    potentials.push(parent);
                    potentialGrid[parent.y][parent.x] = true;
                }                
            }
        });
        const pindex = Math.floor(Math.random()*parents.length);
        const parent = parents[pindex];

        if ((parent.y==y) && (parent.x==x-1)) //LEFT
        {
            vertSep[y][x] = false;
        }
        if ((parent.y==y) && (parent.x==x+1)) //RIGHT
        {
            vertSep[y][x+1] = false;
        }
        if ((parent.y==y-1) && (parent.x==x)) //TOP
        {
            horiSep[y][x] = false;
        }
        if ((parent.y==y+1) && (parent.x==x)) //BOTTOM
        {
            horiSep[y+1][x] = false;
        }

        selecteds.push(y*width+x);
        selectedGrid[y][x] = true;
        selectedCount++;
    }

    horiSep[0][0] = false;
    horiSep[height][width-1] = false;

    const rows = genIndexes(height).map((y) => 
    {
        return (<div className={styles.row}>
            {genIndexes(width).map((x) => (<Block size={size} x={x} y={y} width={width} height={height} vertSep={vertSep} horiSep={horiSep} />))}
        </div>)
    });

    return (
        <div className={styles.maze}>
            {rows}
        </div>
    );
}
