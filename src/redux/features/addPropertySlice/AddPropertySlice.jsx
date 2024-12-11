import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value1: "",
  value2: "",
  value3: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setValue1: (state, action) => {
      state.value1 = action.payload;
    },
    setValue2: (state, action) => {
      state.value2 = action.payload;
    },
    setValue3: (state, action) => {
      state.value3 = action.payload;
    },
    setAllValues: (state, action) => {
      state.value1 = action.payload.value1;
      state.value2 = action.payload.value2;
      state.value3 = action.payload.value3;
    },
  },
});

export const { setValue1, setValue2, setValue3, setAllValues } = formSlice.actions;

export const selectFormData = (state) => state.form;

export default formSlice.reducer;
