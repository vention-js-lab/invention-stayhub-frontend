import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccommodationState {
  createdAccommodationId: string | null;
}

const initialState: AccommodationState = {
  createdAccommodationId: null,
};

const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState,
  reducers: {
    addCreatedAccommodation: (state, action: PayloadAction<string | null>) => {
      state.createdAccommodationId = action.payload;
    },
    clearCreatedAccommodation: (state) => {
      state.createdAccommodationId = null;
    },
  },
});

export const { addCreatedAccommodation, clearCreatedAccommodation } = accommodationSlice.actions;
export const accommodationReducer = accommodationSlice.reducer;
