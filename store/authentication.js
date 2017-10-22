import axios from 'axios';
import { stedsServer } from '~/assets/js/config';
import _ from 'lodash';
export const state = () => ({
  ip: null,
  state: 0,
  mId: null,
  identifier: null,
  authSeq: 0,
  limit: null,
  error: null,
  via: null,
  name: null,
  role: null
});
export const actions = {
  async getAuth({ commit }, roleReq) {
    // let { data } = await axios.get(`${stedsServer}/auth/getAuth/${roleReq}`);
    let { data } = await axios.get(`${stedsServer}/auth/getAuth`);

    console.log('authtest data', data, roleReq);
    if (data.role < roleReq && data.state > 0) {
      data.error = `You don't have permission for this request`;
    }
    commit('newAuthentication', data);
  },
  async checkAuth({ commit }) {
    let { data } = await axios.get(`${stedsServer}/auth/checkAuth`);

    console.log('authtest data', data);
    commit('newAuthentication', data);
  },
  async changeStatus({ commit }, action, roleReq) {
    let { data } = await axios.get(
      `${stedsServer}/auth/changeStatus/${action}/${roleReq}`
    );
    console.log('submitIdentifier data', data);
    commit('newAuthentication', data);
  }
  //   async submitIdentifier({ commit }, identifier) {
  //     let { data } = await axios.get(
  //       `${stedsServer}/auth/changeStatus/${identifier}`
  //     );
  //     console.log('submitIdentifier data', data);
  //     commit('newAuthentication', data);
  //   },
  //   async submitVerification({ commit }, vefication) {
  //     let { data } = await axios.get(
  //       `${stedsServer}/auth/changeStatus/${vefication}`
  //     );
  //     console.log('submitVerification data', data);
  //     commit('newAuthentication', data);
  //   }
};
export const mutations = {
  newAuthentication(state, value) {
    _.forEach(value, (val, key) => (state[key] = val));
    _.forEach(
      _.difference(_.keys(state), _.keys(value)),
      key => (state[key] = null)
    );
    console.log('newAuthentication', state);
    // state.replaceState(value);
    // Window.localStorage.setItem('authentication', JSON.stringify(value));
  },
  hydrateAuthentication(state) {
    if (Window.localStorage) {
      let json = Window.localStorage.getItem('authentication');
      if (json) {
        let value = JSON.parse(json);
        if (value) state.replaceState(value);
      }
    }
  }
};

// store.dispatch('hydrateStore');
// store.actions.hydrateStore();
// Window.localStorage.setItem('Aidan the Last');
