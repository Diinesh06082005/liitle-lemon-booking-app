import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { fetchAPI, submitAPI } from '../utils/api';

// Reducer function to manage available times state
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return { ...state, times: fetchAPI(new Date(action.payload)) };
    default:
      return state;
  }
};

// Initial state for the reducer
export const initializeTimes = () => {
  return { times: fetchAPI(new Date()) };
};

const BookingPage = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const isSubmitted = submitAPI(formData);
    if (isSubmitted) {
      navigate('/confirmed');
    }
  };

  return (
    <div>
      <BookingForm
        availableTimes={availableTimes.times}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </div>
  );
};

export default BookingPage;
