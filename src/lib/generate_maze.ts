import { genIndexes } from "./misc";

export interface TMaze
{
    horiSep: boolean[][];
    vertSep: boolean[][];
    pathLength: number;
}

export type Coor = {y: number,x: number};

const _generateMaze = (width: number,height: number): TMaze => 
{    
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
    const parentGrid = genIndexes(height).map(y => genIndexes(width).map((x): Coor => ({y: -1,x: -1})));
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
        parentGrid[y][x] = parent;
    }

    horiSep[0][0] = false;
    // horiSep[height][width-1] = false;

    let pathLength = 0;

    let pnt: Coor = {y: height-1,x: width-1};

    while((pnt.y!==0) || (pnt.x!==0))
    {
        pnt = parentGrid[pnt.y][pnt.x];
        pathLength++;
    }

    return {
        horiSep,
        vertSep,
        pathLength
    };
};

export const generateMaze = (width: number,height: number): TMaze => 
{
    // const lowerF = 44/40;
    // const higherF = 50/40;
    const lowerF = 40/40;
    const higherF = 43/40;
    const lower = lowerF*(width+height);
    const higher = higherF*(width+height);
    while(true)
    {        
        const res = _generateMaze(width,height);
        if ((res.pathLength>=lower) && (res.pathLength<=higher)) return res;
    }
};