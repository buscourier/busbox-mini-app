import { createReducer, on } from '@ngrx/store';

import { StepNumber } from '../types';
import { BookingActions } from './actions';
import { BookingState } from './state';

const initialState: BookingState = {
  currentStep: 1,
  maxAvailableStep: 1,
  steps: {
    1: { title: 'Автор заявки', path: 'applicant', isValid: false },
    2: { title: 'Отправитель груза', path: 'departure', isValid: false },
    3: { title: 'Параметры груза', path: 'destination', isValid: false },
    4: { title: 'Завершение', path: 'review', isValid: false },
  },
  stepsData: {
    applicant: null,
    departure: null,
    destination: null,
    review: {
      comment: null,
      rulesAccepted: false,
      processingAccepted: false,
    },
  },
  isSubmitSuccessful: false,
  isSubmitFailed: false,
  error: null,
  bookingResult: null,
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
    BookingActions.updateStepValidation,
    (state, { step, isValid }): BookingState => ({
      ...state,
      steps: {
        ...state.steps,
        [step]: {
          ...state.steps[step],
          isValid,
        },
      },
    }),
  ),
  on(
    BookingActions.setApplicantType,
    (state, { applicantType }): BookingState => ({
      ...state,
      stepsData: {
        ...state.stepsData,
        applicant: {
          ...state.stepsData.applicant,
          applicantType,
        },
      },
    }),
  ),
  on(
    BookingActions.updateIndividualData,
    (state, { data }): BookingState => ({
      ...state,
      stepsData: {
        ...state.stepsData,
        applicant: {
          ...state.stepsData.applicant,
          individual: data,
        },
      },
    }),
  ),
  on(
    BookingActions.updateSenderData,
    (state, { data }): BookingState => ({
      ...state,
      stepsData: {
        ...state.stepsData,
        departure: {
          ...state.stepsData.departure,
          sender: data,
        },
      },
    }),
  ),
  on(
    BookingActions.updateRecipientData,
    (state, { data }): BookingState => ({
      ...state,
      stepsData: {
        ...state.stepsData,
        destination: {
          ...state.stepsData.destination,
          recipient: data,
        },
      },
    }),
  ),
  on(
    BookingActions.updateReview,
    (state, { comment, rulesAccepted, processingAccepted }): BookingState => {
      const updateData = {
        ...(comment !== undefined && { comment }),
        ...(rulesAccepted !== undefined && { rulesAccepted }),
        ...(processingAccepted !== undefined && { processingAccepted }),
      };

      return {
        ...state,
        stepsData: {
          ...state.stepsData,
          review: {
            ...state.stepsData.review,
            ...updateData,
          },
        },
      };
    },
  ),
  on(
    BookingActions.submitOrder,
    (state): BookingState => ({
      ...state,
      isSubmitSuccessful: false,
      isSubmitFailed: false,
    }),
  ),
  on(
    BookingActions.submitOrderSuccess,
    (state, { bookingResult }): BookingState => ({
      ...state,
      isSubmitSuccessful: true,
      isSubmitFailed: false,
      bookingResult,
      error: null,
    }),
  ),
  on(
    BookingActions.submitOrderFailure,
    (state, { error }): BookingState => ({
      ...state,
      isSubmitSuccessful: false,
      isSubmitFailed: true,
      error,
    }),
  ),
  on(BookingActions.restoreState, (state, { restoredState }): BookingState => {
    return {
      ...state,
      currentStep: restoredState.currentStep,
      maxAvailableStep: restoredState.maxAvailableStep,
      steps: restoredState.steps,
      stepsData: restoredState.stepsData,
    };
  }),
  on(
    BookingActions.resetState,
    (state): BookingState => ({
      ...initialState,
      bookingResult: state.bookingResult,
    }),
  ),
);
