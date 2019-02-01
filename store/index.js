// import axios from 'axios';
import { getGalleryData, imageURL } from '~/components/GalleryMixin';
import { getWalkData } from '~/components/WalksMixin';
import {format} from 'date-fns';

export const state = () => ({
  pictures: [],
  years: [],
  curPic: 0,
  gpxJ: [],
  nextWalk: {date:'2015-01-01'},
  // userCanHover: false,
  secondaryHeading: null
});
export const actions = {
  async getNextWalk({commit}){
    console.log('getNextWalk dispatch')
    let dat = format(new Date(), 'yyyy-MM-dd');
    if (dat <=this.state.nextWalk.date) return;
    let { data } = await getWalkData(`GetNextWalkData`, dat);
    commit('setNextWalk', data);
  },
  async hydrateStore({ commit, dispatch }) {
    let res;
    dispatch('getNextWalk');
    setInterval(()=>dispatch('getNextWalk'), 1000*60*60)
    res = await getGalleryData('getPictures');
    console.log('getPictures', res.data)
    res.data.forEach(pic => {
      pic.imageUrl = imageURL(pic, 'normal');
      pic.thumbUrl = imageURL(pic, 'thumb');
      pic.fullUrl = imageURL(pic, 'filename');
      pic.album = pic.album.replace(/&amp;/gi, '&')
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
  setNextWalk(state, data){
    state.nextWalk = data;
  },
  setSecondaryHeading(state, data) {
    state.secondaryHeading = data;
  }
};
