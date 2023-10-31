import { AppCash, IAppState } from "app.types";

export const localCash = {
  getDataFromStore: (): AppCash | null => {
    const savedStateJSON = localStorage.getItem("appState");
    const savedSessionArray = localStorage.getItem("sessionWords");

    if (savedStateJSON && savedSessionArray) {
      return {
        savedState: JSON.parse(savedStateJSON),
        savedSessionArray: JSON.parse(savedSessionArray),
      } as AppCash;
    }
    return null;
  },
  removeDataFromStorage: (): void => {
    localStorage.clear();
  },
  saveDataInStorage: (stateJSON: IAppState, sessionArray: string[]): void => {
    localStorage.setItem("appState", JSON.stringify(stateJSON));
    localStorage.setItem("sessionWords", JSON.stringify(sessionArray));
  },
};
