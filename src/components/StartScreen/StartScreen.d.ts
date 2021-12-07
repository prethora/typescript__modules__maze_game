interface TProp {
    show: boolean;
    onFadedOut: () => void;
    onFadedIn: () => void;
    onStartedFadeIn?: () => void;
    onStartedFadeOut?: () => void;
}
export declare function StartScreen({ show, onFadedOut, onFadedIn, onStartedFadeIn, onStartedFadeOut }: TProp): JSX.Element;
export {};
