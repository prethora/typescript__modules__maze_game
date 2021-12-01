declare namespace MazeScssNamespace {
  export interface IMazeScss {
    maze: string;
    row: string;
  }
}

declare const MazeScssModule: MazeScssNamespace.IMazeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MazeScssNamespace.IMazeScss;
};

export = MazeScssModule;
