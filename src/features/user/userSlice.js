import { createSlice } from '@reduxjs/toolkit';
import data from '../../data.json';

const initialState = data.currentUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      const { username, png, webp } = action.payload;
      state.username = username;
      state.image = { png, webp };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
