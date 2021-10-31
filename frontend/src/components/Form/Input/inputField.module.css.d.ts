declare namespace InputFieldModuleCssNamespace {
  export interface IInputFieldModuleCss {
    field: string;
    field__container: string;
    field__entry: string;
    field__fieldset: string;
    field__input: string;
    "field__input-internal-autofill-selected": string;
    field__label: string;
    field__legend: string;
    field_light: string;
    field_outlined: string;
    "is-filled": string;
    "is-focused": string;
  }
}

declare const InputFieldModuleCssModule: InputFieldModuleCssNamespace.IInputFieldModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputFieldModuleCssNamespace.IInputFieldModuleCss;
};

export = InputFieldModuleCssModule;
