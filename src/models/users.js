import { hashHistory } from 'dva/router';



import { queryUser } from '../services/users.js';


export default {
	namespace: 'users',//这个是state的第一级属性名
	state: {
		list: [],
		total: null,
		current: null,
		currentItem: [],
		modalVisible: false,
		modalType: 'create'
	},
	//todo 怎么订阅其他东西？
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(loaction => {
				if (loaction.pathname === '/users') {
					dispatch({
						type: 'getUserList',
						payload: {}
					});
				}
			});
		}
	},
	//异步相关
	effects: {
		//第一个参数应该是 action的对象，第二个是effect的方法
		*getUserList({ payload }, { select, call, put }) {
			yield put({ type: 'showLoading'});
			const { data } = yield call(queryUser, {a: 'getUserList'});//调用上面异步方法
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						list: data.result.list,
						total: data.result.total,
						current: data.result.current
					}
				});
			}
		},
		*delUser({ payload }, { call, put }) {
			yield put({ type: 'showLoading' });
			const { data } = yield call(queryUser, {a: 'delUser', id: payload.id});

			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						list: data.result.list,
						total: data.result.total,
						current: data.result.current
					}
				});
			}
		}
	},
	reducers: {
		showLoading(state){
			return { ...state, loading: true }
		},
		showModal(){},
		hideModal(){},
		querySuccess(state, action){
			return {...state, ...action.payload, loading: false};
		},
		createSuccess(){},
		deleteSuccess(){},
		updateSuccess(){}
	}
}