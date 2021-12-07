interface TProp {
    show: boolean;
    gameOverFlash: boolean;
    onFadedIn: () => void;
    onTextFadedEither: () => void;
}
export declare function GameOverOverlay({ show, gameOverFlash, onFadedIn, onTextFadedEither }: TProp): JSX.Element;
export {};
