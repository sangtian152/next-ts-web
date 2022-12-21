import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import {appSlice} from './slices/app';
import {authSlice} from './slices/auth';
// import logger from "redux-logger";
 
const combinedReducers = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});
export const reduxStore = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        // 在这里设置在客户端和服务器端共享的cookie数据
        subtrees: ["auth.token", "auth.isLogin"], 
        }) 
    )
    if (process.env.NODE_ENV === `development`) {
      const { logger } = require(`redux-logger`);
     
      middlewares.push(logger);
    }
    return middlewares
  }
})

const makeStore = wrapMakeStore(() => reduxStore)

export const wrapper = createWrapper(makeStore, {debug: true});