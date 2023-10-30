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

function drawEndTable({
  answerElement,
  lettersElement,
  totalRightWords,
  totalErrors,
  weaknessWord,
}: IDrawEndTableParams) {
  const totalRightWordsElement = document.createElement("div");
  const totalErrorsElement = document.createElement("div");
  const weaknessWordElement = document.createElement("div");

  answerElement.innerHTML = "";

  lettersElement.hidden = true;

  totalRightWordsElement.textContent = `Total Right Words: ${totalRightWords}\n`;

  totalErrorsElement.textContent = `Total Errors: ${totalErrors}\n`;

  weaknessWordElement.textContent = `Weakness Word: ${weaknessWord}\n`;

  answerElement.appendChild(totalRightWordsElement);
  answerElement.appendChild(totalErrorsElement);
  answerElement.appendChild(weaknessWordElement);
}

export { shuffleArray, shuffleWord, drawEndTable };
