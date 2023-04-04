import { connect } from 'react-redux';
//connect的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回一个你的组件中需要的 props。
const mapStateToProps = (state:any) => { 
    return Object.assign({}, state)
}
export const connectRedux = (Component: any) => {
    return connect(mapStateToProps)(Component)
}