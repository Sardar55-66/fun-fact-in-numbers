export interface NumberInfo {
  text: string;
  number: number;
  found: boolean;
  type: string;
}

export interface UserInput {
  number: string;
  infoType: 'math' | 'trivia' | 'date';
  isRandom: boolean;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export type InfoType = 'math' | 'trivia' | 'date'; 