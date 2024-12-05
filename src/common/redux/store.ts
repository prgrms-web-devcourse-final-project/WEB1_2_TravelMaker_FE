import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@pages/Main/features/counter/counterSlice";
import tokenSlice from "@common/redux/tokenSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenSlice, // token slice 추가
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
