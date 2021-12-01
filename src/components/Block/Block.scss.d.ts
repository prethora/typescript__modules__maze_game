declare namespace BlockScssNamespace {
  export interface IBlockScss {
    block: string;
    bottom: string;
    left: string;
    right: string;
    top: string;
  }
}

declare const BlockScssModule: BlockScssNamespace.IBlockScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BlockScssNamespace.IBlockScss;
};

export = BlockScssModule;
