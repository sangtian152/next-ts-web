import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import type { AnyAction} from 'redux';

// 获取用户信息
export const fetchUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    return "user name";
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: (error as Error).message });
  }
});

// 登录
export const login = createAsyncThunk(
  "auth/login",
  async (_, thunkAPI) => {
    try {
      return {
        token: "this is new token",
        isLogin: true
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMsg: (error as Error).message });
    }
  }
);

export interface authState {
  count: number;
  token: string|null;
  userName: string;
  errorMsg: string|null;
  isLogin: boolean;
}

// 初始化数据
const internalInitialState:authState = {
  count: 0,
  token: null,
  userName: '',
  errorMsg: null,
  isLogin: false,
};

// reducer
export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    updateAuth(state, action) {
      state.token = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state:authState, action:AnyAction) => {
        return Object.assign({}, state, { ...action.payload.auth });
      })
      .addCase(login.rejected, (state:authState, action:AnyAction) => {
        state = Object.assign(Object.assign({}, internalInitialState), {
          errorMsg: action.payload.errorMsg,
        });
      })
      .addCase(login.fulfilled, (state:authState, action:AnyAction) => {
        state.count++;
        state.token = action.payload.token;
        state.isLogin = action.payload.isLogin;
      })
      .addCase(fetchUser.rejected, (state:authState, action:AnyAction) => {
        state = Object.assign(Object.assign({}, internalInitialState), {
          errorMsg: action.errorMsg,
        });
      })
      .addCase(fetchUser.fulfilled, (state:authState, action:AnyAction) => {
        state.userName = action.payload;
      })
  }
});

export const { updateAuth, reset } = authSlice.actions;

export const selectUserName = (state:authState) => state.userName;

export const selectToken = (state:authState) => state.token;

export const selectCount = (state:authState) => state.count;


export default authSlice.reducer