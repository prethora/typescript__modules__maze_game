declare namespace MazeScssNamespace {
  export interface IMazeScss {
    frame: string;
    hide: string;
    instant: string;
    maze: string;
    player: string;
    row: string;
    show: string;
    slow: string;
  }
}

declare const MazeScssModule: MazeScssNamespace.IMazeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MazeScssNamespace.IMazeScss;
};

export = MazeScssModule;
