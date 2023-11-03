import { IInitInterfaceManager } from "./app.types";
import { missSpelling, setMissingSpelling } from "./app";
import { LETTER_ANIMATION_DURATION } from "./data/app.constants";

export const initInterfaceManager = ({
  lettersElement,
  state,
}: IInitInterfaceManager) => {
  const handleKeyPress = (event: { key: string }): void => {
    const key = event.key.toLowerCase();
    if (key.match(/^[a-z]$/i)) {
      let index = hideExistingLetter(lettersElement, key);
      onKeyButtonClick(key, index);
    }
  };

  const onKeyPress = (event: { key: string }): void => {
    handleKeyPress(event);
  };

  const hideExistingLetter = (element: HTMLElement, key: string) => {
    let index = -1;
    state.shuffledWord.forEach((letter: string, i: number) => {
      let letterElement = element.children[i] as HTMLElement;
      if (letterElement && key === letter && !letterElement.hidden) {
        index = i;
      }
    });

    return index;
  };

  const drawDangerButton = (element: HTMLElement): void => {
    element.classList.replace("btn-primary", "btn-danger");
    setTimeout(() => {
      element.classList.replace("btn-danger", "btn-primary");
    }, LETTER_ANIMATION_DURATION);
  };

  const fillAllRedColor = (errors: number, element: HTMLElement) => {
    if (errors === 3) {
      Array.from(element.children).forEach((child: Element) => {
        if (!child.classList.contains("btn-danger")) {
          child.classList.replace("btn-primary", "btn-danger");
        } else {
          console.log(child);
          child.classList.remove("btn-primary");
          child.classList.add("btn-danger");
        }
      });
    }
  };

  const changeLetterStyle = (
    letter: string,
    lettersElement: HTMLElement,
    index: number
  ): void => {
    state.inputLetters += letter;
    let letterElement = lettersElement.children[index] as HTMLButtonElement;
    if (lettersElement.children[index]) {
      if (lettersElement.children[index] && !missSpelling) {
        letterElement.hidden = true;
      } else {
        drawDangerButton(letterElement);
      }
    }
    fillAllRedColor(state.currentLevelErrors, lettersElement);
  };

  const createButton = (
    text: string,
    className: string,
    clickHandler: () => void
  ): HTMLButtonElement => {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.style.margin = "5px";
    if (clickHandler) {
      button.addEventListener("click", clickHandler);
    }
    return button;
  };

  const onKeyButtonClick = (letter: string, i: number): void => {
    if (state.isWordInErrorState) return;
    changeLetterStyle(letter, lettersElement, i);
    setMissingSpelling(false);
  };

  window.addEventListener("keydown", onKeyPress);

  return {
    createButton,
    onKeyButtonClick,
    onKeyPress,
    fillAllRedColor,
  };
};
