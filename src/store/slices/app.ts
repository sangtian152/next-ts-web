import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getAppInfo } from '@/api/home'
import type { AnyAction} from 'redux';
// 获取网站信息
export const fetchAppInfo = createAsyncThunk("app/fetchAppInfo", async (_, thunkAPI) => {
  try {
    const payload = {
      domain: 'testyzsdata.jzhangfang.com'
    }
    const res = await getAppInfo(payload)
    const { Status, Ret } = res.data
    if (Status === 1) {
      const info = Ret[0] || {}
      return {...info}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: (error as Error).message });
  }
});

export interface appState {
  domain: string;
  title: string,
  ico: string,
  logo: string,
  platform: string, // 登录企业服务平台
  register: string, // 共享财税-注册开通
  shopweb: string,
  companyName: string,
  address: string,
  contact: string,
  recordNo: string,
  gzhCode: string,
  xcxCode: string,
  partnerId: string,
}

// 初始化数据
const internalInitialState:appState = {
  domain: "",
  title: "",
  ico: "",
  logo: "",
  platform: "", // 登录企业服务平台
  register: "", // 共享财税-注册开通
  shopweb: "",
  companyName: "",
  address: "",
  contact: "",
  recordNo: "",
  gzhCode: "",
  xcxCode: "",
  partnerId: '',
};

// reducer
export const appSlice = createSlice({
  name: "app",
  initialState: internalInitialState,
  reducers: {
    updateApp(state, {payload}) {
      state.partnerId = payload.id
      state.domain = payload.domain
      state.title = payload.name
      state.ico = payload.iconUrl
      state.logo = payload.logoUrl || '/assets/yzs-logo.png',
      state.platform = payload.domain + '/back/index.html' // 登录企业服务平台
      state.register = payload.jzfDomain // 共享财税-注册开通
      state.shopweb = payload.shopDomain
      state.companyName = payload.icpCompanyName
      state.address = payload.icpCompanyAddress
      state.contact = payload.icpCompanyPhone
      state.recordNo = payload.icpNumber
      state.gzhCode = payload.wxgzhQrcodeUrl // 底部公众号
      state.xcxCode = payload.wxappQrcodeUrl // 底部小程序
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state:appState, action:AnyAction) => {
        return Object.assign({}, state, { ...action.payload.app });
      })
      .addCase(fetchAppInfo.rejected, (state:appState) => {
        state = Object.assign(Object.assign({}, internalInitialState));
      })
      .addCase(fetchAppInfo.fulfilled, (state:appState, action:AnyAction) => {
        const { payload } = action
        state.partnerId = payload.id
        state.domain = payload.domain
        state.title = payload.name
        state.ico = payload.iconUrl
        state.logo = payload.logoUrl || '/assets/yzs-logo.png',
        state.platform = payload.domain + '/back/index.html' // 登录企业服务平台
        state.register = payload.jzfDomain // 共享财税-注册开通
        state.shopweb = payload.shopDomain
        state.companyName = payload.icpCompanyName
        state.address = payload.icpCompanyAddress
        state.contact = payload.icpCompanyPhone
        state.recordNo = payload.icpNumber
        state.gzhCode = payload.wxgzhQrcodeUrl // 底部公众号
        state.xcxCode = payload.wxappQrcodeUrl // 底部小程序
      })
  }
});

export const { updateApp, reset } = appSlice.actions;



export default appSlice.reducer