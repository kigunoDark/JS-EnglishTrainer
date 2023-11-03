const WORDS_LIST: string[] = [
  "apple",
  "function",
  "timeout",
  "task",
  "application",
  "data",
  "tragedy",
  "sun",
  "symbol",
  "button",
  "software",
];

const ABSOLUTE_WINNER = "You Have A Perfect Memory!";
const SUCCESS_DURATION: number = 100;
const ERROR_DURATION: number = 1000;
const ENDGAME_DURATION: number = 300;
const LETTER_ANIMATION_DURATION: number = 200;
const TRASH_ERROR_NOTIFICATION: string = "Something get wrong with you game";
const START_PAGE_RENDER_FAILED: string =
  "It seems like you page is not loaded yet!";
const MAX_ERRORS: number = 3;

export {
  ABSOLUTE_WINNER,
  WORDS_LIST,
  SUCCESS_DURATION,
  ENDGAME_DURATION,
  ERROR_DURATION,
  LETTER_ANIMATION_DURATION,
  TRASH_ERROR_NOTIFICATION,
  MAX_ERRORS,
  START_PAGE_RENDER_FAILED,
};
