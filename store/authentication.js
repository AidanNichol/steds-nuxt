import axios from 'axios';
import {
  stedsServer
} from '~/assets/js/config';
import {forEach, difference, keys} from 'lodash';
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
  roles: ''
});
export const actions = {
  async getAuth({
    commit
  }, roleReq) {
    // let { data } = await axios.get(`${stedsServer}/auth/getAuth/${roleReq}`);
    let {
      data
    } = await axios.get(`${stedsServer}/auth/getAuth`);

    console.log('authtest data', data, roleReq);
    if (!(data.roles||'').includes(roleReq) && data.state > 0) {
      data.error = `You don't have permission for this request`;
    }
    commit('newAuthentication', data);
  },
  async checkAuth({
    commit
  }) {
    let {
      data
    } = await axios.get(`${stedsServer}/auth/checkAuth`);

    console.log('authtest data', data);
    commit('newAuthentication', data);
  },

  async sendRequest({
    commit
  }, payload) {
    console.log('sendRequest', payload)
    let {
      data
    } = await axios.get(
      `${stedsServer}/auth/${payload.join('/')}`
    );
    console.log('sendRequest reponse data', data);
    commit('newAuthentication', data);
  }
};
export const mutations = {
  newAuthentication(state, value) {
    console.log('oldAuthentication', state);
    forEach(value, (val, key) => (state[key] = val));
    forEach(
      difference(keys(state), keys(value)),
      key => (state[key] = null)
    );
    // state.replaceState(value);
    console.log('newAuthentication', state);
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
