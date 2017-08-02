export interface Options {
    scrollYOffset?: any;
    disableLazySchemas?: boolean;
    specUrl?: string;
    suppressWarnings?: boolean;
    hideHostname?: boolean;
    lazyRendering?: boolean;
    expandResponses?: Set<string> | 'all';
    $scrollParent?: HTMLElement | Window;
    requiredPropsFirst?: boolean;
    noAutoAuth?: boolean;
    pathInMiddlePanel?: boolean;
    untrustedSpec?: boolean;
    spec?: any;
}
export declare class OptionsService {
    private _options;
    constructor();
    options: Options;
    parseOptions(el: HTMLElement): void;
    _normalizeOptions(): void;
}
