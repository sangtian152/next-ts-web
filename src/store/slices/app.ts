import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getAppInfo } from '@/api/home'
import type { AnyAction} from 'redux';

// 获取网站信息
export const fetchAppInfo:any = createAsyncThunk("app/fetchAppInfo", async (payload:Record<string, string>, thunkAPI) => {
  try {
    const res = await getAppInfo(payload)
    const { Status, Ret } = res.data
    if (Status === 1) {
      const info = Ret[0] || internalInitialState
      return {...info}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: (error as Error).message });
  }
});

export interface AppState {
  domain: string;
  title: string;
  ico: string;
  logo: string;
  platform: string; // 登录企业服务平台
  register: string; // 共享财税-注册开通
  shopweb: string;
  companyName: string;
  address: string;
  contact: string;
  recordNo: string;
  gzhCode: string;
  xcxCode: string;
  partnerId: string;
  seoDescr: string;
  seoKeyword: string;
  seoTitle: string;
  moduleId: string;
}

// 初始化数据
const internalInitialState:AppState = {
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
  seoDescr: '',
  seoKeyword: '',
  seoTitle: '',
  moduleId: ''
};

// reducer
export const appSlice = createSlice({
  name: "app",
  initialState: internalInitialState,
  reducers: {
    updateApp(state, {payload}:AnyAction) {
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
    updateSeo(state, {payload}) {
      state.seoDescr = payload.seodescr
      state.seoKeyword = payload.seokeyword
      state.seoTitle = payload.seotitle
    },
    updateModule(state, {payload}) {
      state.moduleId = payload.moduleId
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state:AppState, action:AnyAction) => {
        return Object.assign({}, state, { ...action.payload.app });
      })
      .addCase(fetchAppInfo.rejected, (state:AppState) => {
        state = Object.assign(Object.assign({}, internalInitialState));
      })
      .addCase(fetchAppInfo.fulfilled, (state:AppState, action:AnyAction) => {
        appSlice.caseReducers.updateApp(state, action);
      })
  }
});

export const { updateApp, updateSeo, updateModule, reset } = appSlice.actions;



export default appSlice.reducer