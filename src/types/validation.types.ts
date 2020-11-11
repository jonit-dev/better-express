export interface IValidationError {
  target?: Object | undefined;
  value?: string;
  property?: string;
  children?: object[];
  constraints?: { [type: string]: string } | undefined;
}
