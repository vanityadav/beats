import spotifyPlayerReducer from "./features/spotifyPlayer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    spotifyPlayerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["spotifyPlayer/setPlayer"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["spotifyPlayerReducer.player"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
