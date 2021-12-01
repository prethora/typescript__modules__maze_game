interface TProp {
    size: number;
    x: number;
    y: number;
    width: number;
    height: number;
    vertSep: boolean[][];
    horiSep: boolean[][];
}
export declare function Block({ size, x, y, width, height, vertSep, horiSep }: TProp): JSX.Element;
export {};
