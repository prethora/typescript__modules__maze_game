declare namespace BlockScssNamespace {
  export interface IBlockScss {
    block: string;
    bottom: string;
    bottomOpening: string;
    edgeBottom: string;
    edgeLeft: string;
    edgeRight: string;
    edgeTop: string;
    fog: string;
    fogBottom: string;
    fogRight: string;
    fogged: string;
    left: string;
    right: string;
    top: string;
    topOpening: string;
  }
}

declare const BlockScssModule: BlockScssNamespace.IBlockScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BlockScssNamespace.IBlockScss;
};

export = BlockScssModule;
