import { ABSOLUTE_WINNER } from "./data/app.constants";
import { initInterfaceManager } from "./app.component";
import { IAppRender, IAppState } from "./app.types";
import { localCash } from "./data/local-cash";
export let missSpelling: boolean = false;

export const setMissingSpelling = (value: boolean) => {
  missSpelling = value;
};

export const runApp = async ({
  answerElement,
  lettersElement,
  currentQuestionElement,
  totalQuestionsElement,
  warningElement,
}: IAppRender) => {
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
    let cashData = localCash.getDataFromStore();

    let sessionWords: string[] = cashData
      ? cashData.savedSessionArray
      : shuffleArray(WORDS_LIST);

    const initialState: IAppState = cashData
      ? cashData.savedState
      : {
          currentWordIndex: 0,
          currentWord: sessionWords[0],
          shuffledWord: shuffleWord(sessionWords[0]),
          inputLetters: "",
          totalErrors: 0,
          isWordInErrorState: false,
          currentLevelErrors: 0,
          totalRightWords: 0,
          maxWordErrors: 0,
          weaknessWord: ABSOLUTE_WINNER,
        };

    const render = (state: IAppState) => {
      console.log(sessionWords);
      localCash.saveDataInStorage(state, sessionWords);
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
      currentQuestionElement.textContent = String(state.currentWordIndex + 1);
      totalQuestionsElement.textContent = String(sessionWords.length);
    };

    const state = createProxy({
      initialState,
      sessionWords,
      answerElement,
      lettersElement,
      shuffleWord,
      render,
      drawEndTable,
    });

    const { onKeyButtonClick, createButton, onKeyPress } = initInterfaceManager(
      { lettersElement, warningElement, state }
    );

    window.addEventListener("keydown", onKeyPress);

    if (state) render(state);
  } catch (error) {
    alert(TRASH_ERROR_NOTIFICATION);
  }
};
