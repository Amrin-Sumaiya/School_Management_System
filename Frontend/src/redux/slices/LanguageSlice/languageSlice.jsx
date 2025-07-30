import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'english',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const getLanguage = (state) => state?.languageData?.language;
export default languageSlice.reducer;
