declare namespace StartScreenScssNamespace {
  export interface IStartScreenScss {
    action: string;
    controls: string;
    flash: string;
    frame: string;
    middleText: string;
    show: string;
    title: string;
  }
}

declare const StartScreenScssModule: StartScreenScssNamespace.IStartScreenScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StartScreenScssNamespace.IStartScreenScss;
};

export = StartScreenScssModule;
