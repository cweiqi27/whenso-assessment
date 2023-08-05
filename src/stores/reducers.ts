import { combineReducers } from "@reduxjs/toolkit";
import authUserReducer from "@/features/auth/slices";

export const rootReducers = combineReducers({ authUser: authUserReducer });
