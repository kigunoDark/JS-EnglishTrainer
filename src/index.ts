import { START_PAGE_RENDER_FAILED } from "./data/app.constants";
import { runApp } from "./app";
import "./app.css";
import "./index.html";

const appStart = () => {
  const answerElement: HTMLElement = document.getElementById("answer")!;
  const lettersElement: HTMLElement = document.getElementById("letters")!;
  const warningElement: HTMLElement =
    document.querySelector(".warning-element")!;
  const currentQuestionElement: HTMLElement =
    document.getElementById("current_question")!;
  const totalQuestionsElement: HTMLElement =
    document.getElementById("total_questions")!;

  console.log(warningElement);
  if (
    answerElement &&
    lettersElement &&
    currentQuestionElement &&
    totalQuestionsElement &&
    warningElement
  ) {
    typeof window !== "undefined" &&
      runApp({
        answerElement,
        lettersElement,
        currentQuestionElement,
        totalQuestionsElement,
        warningElement,
      });
  } else {
    alert(START_PAGE_RENDER_FAILED);
  }
};

appStart();
