import { setIsWordInErrorState, setMissingSpelling } from "../app";
import {
  ENDGAME_DURATION,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../data/app.constants";
import { IAppState, ICreateProxy } from "../app.types";

export function createProxy({
  initialState,
  sessionWords,
  answerElement,
  lettersElement,
  shuffleWord,
  render,
  drawEndTable,
}: ICreateProxy) {
  const maxErrors: number = 3;

  const stateHandler = {
    set(target: IAppState, property: string, value: string): boolean {
      function updateGameNextState() {
        target.currentWord = sessionWords[target.currentWordIndex];
        target.shuffledWord = shuffleWord(target.currentWord);
        target.inputLetters = "";
        target.currentLevelErrors = 0;
        setIsWordInErrorState(false);
        value = "";
      }

      function gameManager() {
        target.currentWordIndex++;

        if (target.currentWordIndex < sessionWords.length) {
          console.log("Win");
          console.log(target.currentWordIndex);
          updateGameNextState();
          setTimeout(() => render(target.currentWordIndex), SUCCESS_DURATION);
        } else {
          setTimeout(() => {
            drawEndTable({
              answerElement,
              lettersElement,
              totalRightWords: target.totalRightWords,
              totalErrors: target.totalErrors,
              weaknessWord: target.weaknessWord,
            });
            target.totalRightWords = 0;
          }, ENDGAME_DURATION);
        }
      }

      function advanceToNextLevelOrFinish() {
        setWeaknessWord();
        gameManager();
      }

      function errorHandler() {
        if (target.currentLevelErrors === maxErrors) {
          setIsWordInErrorState(true);
          answerElement.innerHTML = target.currentWord;
          setTimeout(() => {
            advanceToNextLevelOrFinish();
          }, ERROR_DURATION);
        }
      }

      function setWeaknessWord() {
        if (!target || !sessionWords || target.currentWordIndex < 0) {
          return;
        }

        if (target.currentLevelErrors > target.maxWordErrors) {
          target.maxWordErrors = target.currentLevelErrors;
          target.weaknessWord = sessionWords[target.currentWordIndex];
        } else if (
          target.currentLevelErrors === target.maxWordErrors &&
          target.currentLevelErrors
        ) {
          target.weaknessWord = sessionWords[target.currentWordIndex];
        }
      }

      if (
        !target.currentWord.includes(value[value.length - 1]) ||
        value[value.length - 1] !== target.currentWord[value.length - 1]
      ) {
        target.totalErrors += 1;
        setMissingSpelling(true);
        target.currentLevelErrors++;
        errorHandler();
      } else {
        if (property === "inputLetters") {
          if (value === target.currentWord) {
            target.totalRightWords += 1;
            advanceToNextLevelOrFinish();
          }
        }
        answerElement.textContent = value;
        Reflect.set(target, property, value);
      }
      return true;
    },
  };

  const state = new Proxy(initialState, stateHandler);

  return state;
}
