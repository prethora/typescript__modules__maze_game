import { Coor } from "../../lib/generate_maze";
interface TProp {
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
export declare function Block({ size, x, y, width, height, vertSep, horiSep, radius, posx, posy, onUnfogged, lanterns, lanternRadius }: TProp): JSX.Element;
export {};
