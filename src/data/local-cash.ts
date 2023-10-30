import { IAppState } from "app.types";

export const localCash = {
  getDataFromStore: function (): IAppState | null {
    const savedStateJSON = localStorage.getItem("appState");

    return savedStateJSON && JSON.parse(savedStateJSON);
  },
  removeDataFromStorage: function (): void {
    localStorage.removeItem("appState");
  },
  saveDataInStorage: function (state: IAppState): void {
    const stateJSON = JSON.stringify(state);
    localStorage.setItem("appState", stateJSON);
  },
};
