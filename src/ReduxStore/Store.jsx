import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { LoggedUserReducer } from "./StoreComponents/LoggedUser";
import persistStore from "redux-persist/es/persistStore";
import { AuthMid } from "./AuthMidd";
import { PostReducer } from "./StoreComponents/PostStore";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "posts"],
};

const rootReducer = combineReducers({
  auth: LoggedUserReducer,
  posts: PostReducer,
});

export const ReduxStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(AuthMid),
});

export const persistor = persistStore(ReduxStore);
