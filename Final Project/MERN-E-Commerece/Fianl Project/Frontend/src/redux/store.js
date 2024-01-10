// import {createStore} from "redux"
// import Userreducer from "../reducer"

// export const store =createStore(Userreducer) 
import   {Placereducer, UserReducer}  from "../reducer";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({  User: UserReducer,Place:Placereducer })
);
export const store = createStore(persistedReducer);
export const persistManager = persistStore(store);