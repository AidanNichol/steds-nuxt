import axios from 'axios';
import {
  mapState
} from 'vuex';
import {
  stedsServer
} from '~/assets/js/config';
export const getWalkData = function (...args) {
  // console.log('walksMixin', process.env.NODE_ENV);
  const url = getWalkURL(...args);
  // const url = args.reduce((res, arg) => `${res}/${arg}`, '');
  return axios.get(url);
};
export const postWalkData = function (data, ...args) {
  console.log('walkmixins postWalkData', this);
  const url = getWalkURL(...args);
  // const url = args.reduce((res, arg) => `${res}/${arg}`, '');
  return axios
    .post(url, {
      auth: {
        id: this.mId,
        authSeq: this.seq,
      },
      ...data,
    })
    .then(res => res.data)
    .then(data => {
      if (data.error) {
        this.$notify({
          type: 'error',
          title: args.join(),
          message: data.error,
        });
        throw data.error;
      }
    });
};
export const getWalkURL = function (...args) {
  const url = args.reduce((res, arg) => `${res}/${arg}`, '');

  return `${stedsServer}/walks${url}`;
};

export const getWalkProfileURL = function (...args) {
  let url = args.reduce((res, arg) => `${res}/${arg}`, '');
  if (url.substr(0, 2) === '//') url = url.substr(1);
  if (url.substr(0, 9) === '/walkdata') url = url.substr(9);
  return `http://www.stedwardsfellwalkers.co.uk/walkdata${url}`;
  // return `${stedsServer}/walkdata${url}`;
};

export const getWalkdataURL = function (...args) {
  let url = args.reduce((res, arg) => `${res}/${arg}`, '');
  if (url.substr(0, 2) === '//') url = url.substr(1);
  if (url.substr(0, 9) === '/walkdata') url = url.substr(9);
  // return `http://www.stedwardsfellwalkers.co.uk/walkdata${url}`;
  return `${stedsServer}/walkdata${url}`;
};

export default {
  computed: {
    ...mapState('authentication', ['mId', 'identifier', 'authSeq'])
  },
  methods: {
    getWalkData,
    getWalkURL,
    getWalkdataURL,
    getWalkProfileURL,
    postWalkData,
    mToFt(m) {
      return Math.round(Math.round(m * 3.28084) / 50) * 50;
    },
    dTo1(d) {
      return Number.parseInt(d).toFixed(1);
    },
  },
};
