import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { hnbApi } from './services/hnbData';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    [hnbApi.reducerPath]: hnbApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      hnbApi.middleware
    ),
});

setupListeners(store.dispatch);
