import { configureStore } from '@reduxjs/toolkit';
import commentsSlice from '../features/comments/commentsSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    comments: commentsSlice,
    user: userSlice,
  },
});

export default store;
