import { getGalleryData, imageURL } from '~/components/GalleryMixin';

export const state = () => ({
  curYear: null,
  yearList: [],
  curAlbum: null,
  albumList: [],
  pictures: []
});
export const actions = {
  async getYears({ commit }) {
    let { data } = await getGalleryData('getYears');
    // console.log('getYears data', data);
    commit('setYearList', data);
  },
  async getAlbums({ commit }, year) {
    commit('setYear', year);
    let { data } = await getGalleryData('getAlbums', year);
    data.forEach(alb=>{alb.title = alb.title.replace('&amp;', '&')});

    commit('setAlbumList', data);
  },
  async getAlbum({ commit }, album) {
    commit('setAlbum', album);
    let { data } = await getGalleryData('getAlbum', album);
    // console.log('getAlbums data',album, data);
    data.forEach(pic => {
      pic.imageUrl = imageURL(pic, 'normal');
      pic.thumbUrl = imageURL(pic, 'thumb');
      pic.fullUrl = imageURL(pic, 'filename');
      pic.key = ``;
    });
    commit('setAlbumPictures', data);
  }
};
export const mutations = {
  setYearList(state, value) {
    state.yearList = value;
  },
  setYear(state, value) {
    state.curYear = value;
  },
  setAlbumList(state, value) {
    state.albumList = value;
  },
  setAlbum(state, value) {
    state.curAlbum = value;
  },
  setAlbumPictures(state, value) {
    state.pictures = value;
  }
};

// store.dispatch('hydrateStore');
// store.actions.hydrateStore();
// Window.localStorage.setItem('Aidan the Last');
