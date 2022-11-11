import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import sideBarReducer from "./slices/SideBarSlice";
import { groupApiSlice } from "./slices/groupApiSlice";

export const store = configureStore({
    reducer: {
        modalReducer,
        sideBarReducer,
        [groupApiSlice.reducerPath]: groupApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(groupApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
