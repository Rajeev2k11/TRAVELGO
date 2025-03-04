import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [], // List of tour packages
  loading: false,
  error: null,
};

const packageSlice = createSlice({
  name: "package",
 initialState,
  reducers: {
    setPackage: (state, action) => {
      state.packages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setPackage, setLoading, setError } = packageSlice.actions;

// Export reducer
export default packageSlice.reducer;
