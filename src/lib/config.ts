export interface TMazeConfig
{
    playerVisibilityRadius: number;
    lanternVisibilityRadius: number;
    stepsPerMaze: number;
    lanternsPerMaze: number;
};

const _window = window as any;

export const mazeConfig = _window.mazeConfig as TMazeConfig;