export enum ETypes {
  Alert,
  Error,
  Success,
}

export type B4HAlertProps = {
  type: ETypes;
  text: string;
};
