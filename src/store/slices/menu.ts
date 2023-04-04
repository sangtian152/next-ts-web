import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getMenu } from '@/api/home'
import { tree2menu, tree2arr } from '@/utils'
import type { AnyAction} from 'redux';
import type { MenuProps } from "antd";
import type { TreeType, MyItemType } from "@/utils/types";
// 获取菜单
export const fetchMenu:any = createAsyncThunk("app/fetchMenu", async (payload:Record<string, string>, thunkAPI) => {
  try {
    const res = await getMenu(payload)
    const { Status, Ret } = res.data
    if (Status === 1) {
      return Ret
    }
    return []
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: (error as Error).message });
  }
});

export interface MenuState {
  menus: MenuProps['items'];
  modules: TreeType[];
  treeArr: MyItemType[];
}

// 初始化数据
const internalInitialState:MenuState = {
  menus:[],
  modules:[],
  treeArr: []
};

// reducer
export const menuSlice = createSlice({
  name: "menu",
  initialState: internalInitialState,
  reducers: {
    updateMenu(state:MenuState, {payload}:AnyAction) {
      const prefix:TreeType[] = []
      state.modules = prefix.concat(payload)
      state.menus = tree2menu(prefix.concat(payload))
      state.treeArr = tree2arr(state.menus, [])
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state:MenuState, action:AnyAction) => {
        return Object.assign({}, state, { ...action.payload.menu });
      })
      .addCase(fetchMenu.rejected, (state:MenuState) => {
        state = Object.assign(Object.assign({}, internalInitialState));
      })
      .addCase(fetchMenu.fulfilled, (state:MenuState, action:AnyAction) => {
        menuSlice.caseReducers.updateMenu(state, action);
      })
  }
});

export const { updateMenu, reset } = menuSlice.actions;



export default menuSlice.reducer