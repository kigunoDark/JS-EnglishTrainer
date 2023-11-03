import { IAppState } from "app.types";

export interface Observer {
  (state: IAppState): void;
}
