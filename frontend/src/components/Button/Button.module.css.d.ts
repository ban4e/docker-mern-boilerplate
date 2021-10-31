declare namespace ButtonModuleCssNamespace {
  export interface IButtonModuleCss {
    button: string;
    "button-pulse": string;
    "button-pulse__effect": string;
    button__content: string;
    button__loader: string;
    button_size_md: string;
    button_theme_primary: string;
    button_view_box: string;
    enter: string;
    "enter-active": string;
    indeterminate: string;
    "indeterminate-short": string;
    "is-loading": string;
    "loader-background": string;
  }
}

declare const ButtonModuleCssModule: ButtonModuleCssNamespace.IButtonModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonModuleCssNamespace.IButtonModuleCss;
};

export = ButtonModuleCssModule;
