// сохраанять
// темплейты глянуть и добавить

import { initInterfaceManager } from "./app.component";
import { IAppRender, IAppState } from "./app.types";

export let isWordInErrorState: boolean = false;
export let missSpelling: boolean = false;
export let currentWordIndex: number = 0;

export function setMissingSpelling(value: boolean) {
  missSpelling = value;
}

export function setIsWordInErrorState(value: boolean) {
  isWordInErrorState = value;
}

export async function runApp({
  answerElement,
  lettersElement,
  currentQuestionElement,
  totalQuestionsElement,
}: IAppRender) {
  const [
    { WORDS_LIST, TRASH_ERROR_NOTIFICATION },
    { shuffleArray, shuffleWord, drawEndTable },
    { createProxy },
  ] = await Promise.all([
    import("./data/app.constants"),
    import("./app.helpers"),
    import("./store/app.store"),
  ]);

  try {
    let sessionWords: string[] = shuffleArray(WORDS_LIST);

    const initialState: IAppState = {
      currentWord: sessionWords[currentWordIndex],
      shuffledWord: shuffleWord(sessionWords[currentWordIndex]),
      inputLetters: "",
      totalErrors: 0,
      currentLevelErrors: 0,
      totalRightWords: 0,
      maxWordErrors: 0,
      weaknessWord: "You Have A Perfect Memory!",
    };

    const state = createProxy({
      initialState,
      sessionWords,
      currentWordIndex,
      answerElement,
      lettersElement,
      shuffleWord,
      render,
      drawEndTable,
    });

    const { onKeyButtonClick, createButton, onKeyPress } = initInterfaceManager(
      { lettersElement, state }
    );

    window.addEventListener("keydown", onKeyPress);

    function render() {
      answerElement.innerHTML = "";
      lettersElement.innerHTML = "";
      lettersElement.hidden = false;
      state.shuffledWord.forEach((letter: string, i: number) => {
        const letterButton = createButton(letter, "btn btn-primary", () =>
          onKeyButtonClick(letter, i)
        );
        letterButton.hidden = false;
        lettersElement.appendChild(letterButton);
      });
      currentQuestionElement.textContent = String(currentWordIndex + 1);
      totalQuestionsElement.textContent = String(sessionWords.length);
    }

    render();
  } catch (error) {
    alert(TRASH_ERROR_NOTIFICATION);
  }
}
