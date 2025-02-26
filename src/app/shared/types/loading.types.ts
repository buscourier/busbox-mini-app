export const LoadingStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

export type LoadingStatus = (typeof LoadingStatus)[keyof typeof LoadingStatus];
