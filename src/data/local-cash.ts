import { IAppState } from "app.types";

export const localCash = {
  getDataFromStore: (): IAppState | null => {
    const savedStateJSON = localStorage.getItem("appState");

    return savedStateJSON && JSON.parse(savedStateJSON);
  },
  removeDataFromStorage: (): void => {
    localStorage.removeItem("appState");
  },
  saveDataInStorage: (state: IAppState): void => {
    const stateJSON = JSON.stringify(state);
    localStorage.setItem("appState", stateJSON);
  },
};
