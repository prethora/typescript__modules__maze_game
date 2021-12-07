import { TMaze } from "../../lib/generate_maze";
interface TProp {
    width: number;
    height: number;
    size: number;
    maze: TMaze;
    onRestart: () => void;
    radius: number;
    lanternRadius: number;
    stepsPerMaze: number;
    lanternsPerMaze: number;
    show: boolean;
    onBackToStart: () => void;
    onFadedOut: () => void;
    gameNumber: number;
}
export declare function Maze({ width, height, size, maze, onRestart, radius, lanternRadius, stepsPerMaze, lanternsPerMaze, show, onBackToStart, onFadedOut, gameNumber }: TProp): JSX.Element;
export {};
