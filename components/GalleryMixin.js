import axios from 'axios';
export const getGalleryData = function (...args) {
  const url = args.reduce((res, arg) => `${res}/${arg}`, '');
  return axios.get(
    `http://server.stedwardsfellwalkers.co.uk/cpg${url}`,
    ...args
  );
};

export const imageURL = function (pic, mode = 'normal') {
  const name = `${pic.filepath}${pic[mode]}`;
  return pic ? `http://www.stedwardsfellwalkers.co.uk/gallery/${name}` : ``;
};
export const mapAlbum = src => {
  // process.env.NODE_ENV !== 'production'
  const loc = `http://www.stedwardsfellwalkers.co.uk/gallery/albums`;
  let ret = src.replace(/albums/g, loc);
  return ret;
};
export default {
  methods: {
    imageURL,
    getGalleryData,
    mapAlbum
  }
};
