interface TProp {
    stepsLeft: number;
    wins: number;
    lanternsLeft: number;
    lanternsPerMaze: number;
    gameOver: boolean;
    gameOverFlash: boolean;
}
export declare function Stats({ stepsLeft, wins, lanternsLeft, lanternsPerMaze, gameOver, gameOverFlash }: TProp): JSX.Element;
export {};
