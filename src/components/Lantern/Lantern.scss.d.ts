declare namespace LanternScssNamespace {
  export interface ILanternScss {
    container: string;
    lantern: string;
  }
}

declare const LanternScssModule: LanternScssNamespace.ILanternScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LanternScssNamespace.ILanternScss;
};

export = LanternScssModule;
