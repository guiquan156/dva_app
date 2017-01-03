//经典类型页面dva模型

import {saveStyle as saveStyleServices} from '../services/commStyleServices.js';

export default {
	namespace: 'commStyle',
	state: {
		pubFormState: {}
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
		}
	}

}