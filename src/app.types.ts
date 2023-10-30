export interface IDrawEndTableParams {
  answerElement: HTMLElement;
  lettersElement: HTMLElement;
  totalRightWords: number;
  totalErrors: number;
  weaknessWord: string;
}

export interface IAppFlags {
  isWordInErrorState: boolean;
  missSpelling: boolean;
  setMissingSpelling: (value: boolean) => void;
  setIsWordInErrorState: (value: boolean) => void;
}

export type ICreateProxy = Pick<
  IDrawEndTableParams,
  "answerElement" | "lettersElement"
> & {
  currentWordIndex: number;
  initialState: IAppState;
  sessionWords: string[];
  shuffleWord: (word: string) => string[];
  render: () => void;
  drawEndTable: (params: IDrawEndTableParams) => void;
};

export interface IInitInterfaceManager {
  lettersElement: HTMLElement;
  state: IAppState;
}

export type IAppRender = Pick<
  IDrawEndTableParams,
  "answerElement" | "lettersElement"
> & {
  currentQuestionElement: HTMLElement;
  totalQuestionsElement: HTMLElement;
};

export interface IAppState {
  currentWord: string;
  shuffledWord: string[];
  inputLetters: string;
  totalErrors: number;
  currentLevelErrors: number;
  totalRightWords: number;
  maxWordErrors: number;
  weaknessWord: string;
}
