import { START_PAGE_RENDER_FAILED } from "./data/app.constants";
import { runApp } from "./app";
import "./app.css";
import "./index.html";

const appStart = () => {
  const answerElement: HTMLElement = document.getElementById("answer")!;
  const lettersElement: HTMLElement = document.getElementById("letters")!;
  const currentQuestionElement: HTMLElement =
    document.getElementById("current_question")!;
  const totalQuestionsElement: HTMLElement =
    document.getElementById("total_questions")!;

  if (
    answerElement &&
    lettersElement &&
    currentQuestionElement &&
    totalQuestionsElement
  ) {
    typeof window !== "undefined" &&
      runApp({
        answerElement,
        lettersElement,
        currentQuestionElement,
        totalQuestionsElement,
      });
  } else {
    alert(START_PAGE_RENDER_FAILED);
  }
};

appStart();
