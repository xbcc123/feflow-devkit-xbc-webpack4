const state = {
	loading: true
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
	changaLoading(state, payload) {
		state.loading = payload.loading
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
