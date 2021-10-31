declare namespace ToggleModuleCssNamespace {
  export interface IToggleModuleCss {
    "focus-visible": string;
    toggle: string;
    toggle__content: string;
    toggle__input: string;
    toggle__mark: string;
    "toggle__mark-figure": string;
    "toggle__mark-focus": string;
    "toggle__mark-icon": string;
    toggle__title: string;
    toggle_radio: string;
  }
}

declare const ToggleModuleCssModule: ToggleModuleCssNamespace.IToggleModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToggleModuleCssNamespace.IToggleModuleCss;
};

export = ToggleModuleCssModule;
