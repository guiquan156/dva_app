//经典类型页面dva模型

export default {
	namespace: 'commStyle',
	state: {
		pubFormState: {}
	},
	reducers: {
		updPubFormState(state, {value}) {
			return {...state,  pubFormState: { ...state.pubFormState, ...value }};
		}
	}

}