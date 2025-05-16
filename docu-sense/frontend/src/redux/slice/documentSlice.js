// features/documentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  documents: [], // Use plural for clarity
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    clearDocuments: (state) => {
      state.documents = [];
    },
  },
});

export const { setDocuments, clearDocuments } = documentSlice.actions;
export default documentSlice.reducer;
