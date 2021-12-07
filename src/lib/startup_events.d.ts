declare class StartupEvents {
    eventTotal: number;
    eventCount: number;
    callback?: () => void;
    fired: boolean;
    registerEvent(): void;
    registerCallback(callback: () => void): void;
    fireCallback(): void;
}
export declare const startupEvents: StartupEvents;
export {};
