export interface TMaze {
    horiSep: boolean[][];
    vertSep: boolean[][];
    pathLength: number;
}
export declare type Coor = {
    y: number;
    x: number;
};
export declare const generateMaze: (width: number, height: number) => TMaze;
