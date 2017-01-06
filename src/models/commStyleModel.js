//经典类型页面dva模型

import {saveStyle as saveStyleServices} from '../services/commStyleServices.js';

export default {
	namespace: 'commStyle',
	state: {
		pubFormState: {
			isOpen: true
		},
		pcFormState: {
			isShowListPC: false
		},
		wapFormState: {
			isShowListWap: false

		}
	},
	effects: {
		*saveCommState({ value }, { call, put }) {
			const { data } = yield call(saveStyleServices, 0, value);
			if(data.code == 200){

			}else{
				
			}
		}
	},
	reducers: {
		updPubFormState(state, {value}) {
			return {...state,  pubFormState: { ...state.pubFormState, ...value }};
		},
		updPcFormState(state, {value}) {
			return {...state,  pcFormState: { ...state.pcFormState, ...value }};
		},
		updWapFormState(state, {value}) {
			return {...state,  wapFormState: { ...state.wapFormState, ...value }};
		}
	}

}