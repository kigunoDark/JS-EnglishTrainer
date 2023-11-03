import { setMissingSpelling } from "../app";
import {
  ENDGAME_DURATION,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../data/app.constants";
import { IAppState, ICreateProxy } from "../app.types";
import { defineObservers } from "../render-management/render-management";

export const createProxy = ({
  initialState,
  sessionWords,
  answerElement,
  lettersElement,
  shuffleWord,
  drawEndTable,
}: ICreateProxy) => {
  const maxErrors: number = 3;

  const stateHandler = {
    set(target: IAppState, property: string, value: string): boolean {
      const updateGameNextState = () => {
        target.currentWord = sessionWords[target.currentWordIndex];
        target.shuffledWord = shuffleWord(target.currentWord);
        target.inputLetters = "";
        target.currentLevelErrors = 0;
        target.isWordInErrorState = false;
        value = "";
      };

      const gameManager = () => {
        target.currentWordIndex++;

        if (target.currentWordIndex < sessionWords.length) {
          updateGameNextState();
          setTimeout(() => defineObservers(state), SUCCESS_DURATION);
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
      };

      const advanceToNextLevelOrFinish = () => {
        setWeaknessWord();
        gameManager();
      };

      const errorHandler = () => {
        if (target.currentLevelErrors === maxErrors) {
          target.isWordInErrorState = true;
          answerElement.innerHTML = target.currentWord;
          setTimeout(() => {
            advanceToNextLevelOrFinish();
          }, ERROR_DURATION);
        }
      };

      const setWeaknessWord = () => {
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
      };

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
};
