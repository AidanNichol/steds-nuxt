// import axios from 'axios';
import { getGalleryData, imageURL } from '~/components/GalleryMixin';
import { getWalkData } from '~/components/WalksMixin';

export const state = () => ({
  pictures: [],
  years: [],
  curPic: 0,
  gpxJ: [],
  // userCanHover: false,
  secondaryHeading: null
});
export const actions = {
  async hydrateStore({ commit }) {
    let res = await getWalkData(`GetYears`);
    commit('setYears', res.data);
    res = await getGalleryData('getPictures');
    res.data.forEach(pic => {
      pic.imageUrl = imageURL(pic, 'normal');
      pic.thumbUrl = imageURL(pic, 'thumb');
      pic.fullUrl = imageURL(pic, 'filename');
    });
    commit('setPictures', res.data);
  },
  nextPic({ commit }) {
    commit('nextPic');
  },
  userCanHover({ commit }) {
    commit('userCanHover');
  }
};
export const mutations = {
  userCanHover(state) {
    state.userCanHover = true;
  },
  nextPic(state) {
    state.curPic = (state.curPic + 1) % state.pictures.length;
  },
  setPictures(state, data) {
    state.pictures = data;
  },
  setYears(state, data) {
    state.years = data;
  },
  setSecondaryHeading(state, data) {
    state.secondaryHeading = data;
  }
};
