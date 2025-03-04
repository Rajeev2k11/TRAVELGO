import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: [], // List of tour packages
  loading: false,
  error: null,
};
// export const fetchDestinations = createAsyncThunk(
//   "destinations/fetch",
//   async () => {
//     const response = await fetch("http://localhost:5001/api/locations"); // Replace with actual API
//     return response.json();
//   }
// );
const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
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
export const { setDestinations, setLoading, setError } = destinationSlice.actions;

// Export reducer
export default destinationSlice.reducer;
