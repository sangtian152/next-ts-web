import {reduxStore} from '@/store'
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
type GetstateFunType = typeof reduxStore.getState //我们可以发现他的返回值类型就是我们需要的类型
type IRootState = ReturnType<GetstateFunType> //这样我们就获取到了他的返回值类型
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
