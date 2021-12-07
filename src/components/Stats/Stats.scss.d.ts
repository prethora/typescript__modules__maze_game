declare namespace StatsScssNamespace {
  export interface IStatsScss {
    container: string;
    counter: string;
    cup: string;
    flash: string;
    gameOver: string;
    hiddenImage: string;
    icon: string;
    lantern: string;
    row: string;
    sep: string;
    stairs: string;
    steps: string;
    wins: string;
  }
}

declare const StatsScssModule: StatsScssNamespace.IStatsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StatsScssNamespace.IStatsScss;
};

export = StatsScssModule;
