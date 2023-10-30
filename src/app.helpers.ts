import { localCash } from "./data/local-cash";
import { IDrawEndTableParams } from "./app.types";

const shuffleArray = (array: string[]): string[] => {
  const sessionLength: number = 6;
  const shuffledArray: string[] = [...array];
  shuffledArray.forEach((_, i, arr) => {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });
  return shuffledArray.slice(0, sessionLength);
};

const shuffleWord = (word: string): string[] => {
  const shuffledWord = word.split("").sort(() => Math.random() - 0.5);
  return shuffledWord;
};

const drawEndTable = ({
  answerElement,
  lettersElement,
  totalRightWords,
  totalErrors,
  weaknessWord,
}: IDrawEndTableParams) => {
  localCash.removeDataFromStorage();
  const endGameContainer: HTMLElement | null =
    document.querySelector(".output-element");
  const totalRightWordsElement: HTMLElement | null =
    document.getElementById("totalRightWords");
  const totalErrorsElement: HTMLElement | null =
    document.getElementById("totalErrors");
  const weaknessWordElement: HTMLElement | null =
    document.getElementById("weaknessWord");

  answerElement.innerHTML = "";
  lettersElement.hidden = true;

  if (
    endGameContainer &&
    totalErrorsElement &&
    weaknessWordElement &&
    totalRightWordsElement
  ) {
    totalRightWordsElement.textContent = `Total Right Words: ${totalRightWords}\n`;

    totalErrorsElement.textContent = `Total Errors: ${totalErrors}\n`;

    weaknessWordElement.textContent = `Weakness Word: ${weaknessWord}\n`;

    endGameContainer.style.display = "block";
  }
};

export { shuffleArray, shuffleWord, drawEndTable };
