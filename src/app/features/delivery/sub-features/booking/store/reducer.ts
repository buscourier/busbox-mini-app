import { createReducer, on } from '@ngrx/store';

import { StepNumber } from '../types';
import { BookingActions } from './actions';
import { BookingState } from './state';

const initialState: BookingState = {
  currentStep: 1,
  maxAvailableStep: 1,
  steps: {
    1: { title: 'Автор заявки', path: 'applicant', isValid: true },
    2: { title: 'Отправитель груза', path: 'sender', isValid: true },
    3: { title: 'Параметры груза', path: 'recipient', isValid: true },
    4: { title: 'Завершение', path: 'review', isValid: true },
  },
};

export const bookingReducer = createReducer(
  initialState,
  on(
    BookingActions.navigateToStep,
    (state, { stepNumber }): BookingState => ({
      ...state,
      currentStep: stepNumber,
      maxAvailableStep: Math.max(state.maxAvailableStep, stepNumber) as StepNumber,
    }),
  ),
  on(
    BookingActions.setStepValid,
    (state, { stepNumber, isValid }): BookingState => ({
      ...state,
      steps: {
        ...state.steps,
        [stepNumber]: {
          ...state.steps[stepNumber],
          isValid,
        },
      },
    }),
  ),
);
