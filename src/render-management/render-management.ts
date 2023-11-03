import { IAppState } from "app.types";
import { Observer } from "render-management/render-management.types";

const observers: Observer[] = [];

const addAddObserver = (observerFunction: (state: IAppState) => void): void => {
  observers.push(observerFunction);
};

const defineObservers = (state: IAppState): void => {
  observers.forEach((observer) => observer(state));
};

export { observers, addAddObserver, defineObservers };
