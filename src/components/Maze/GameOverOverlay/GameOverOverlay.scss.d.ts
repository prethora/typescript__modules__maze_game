declare namespace GameOverOverlayScssNamespace {
  export interface IGameOverOverlayScss {
    flash: string;
    frameh: string;
    framev: string;
    show: string;
  }
}

declare const GameOverOverlayScssModule: GameOverOverlayScssNamespace.IGameOverOverlayScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GameOverOverlayScssNamespace.IGameOverOverlayScss;
};

export = GameOverOverlayScssModule;
