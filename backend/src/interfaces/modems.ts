export interface IModems {
  vendor: string;
  name: number;
  soft: string;
}

export interface IModemsJSON {
  version: string,
  models: IModems[]
}