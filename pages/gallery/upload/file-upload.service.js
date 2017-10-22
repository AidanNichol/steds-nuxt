import * as axios from 'axios';
import { stedsServer } from '~/assets/js/config';

function upload(formData) {
  const url = `${stedsServer}/cpg/upload`;
  console.debug('formdata', formData);
  return (
    axios
      .post(url, formData)
      // get data
      .then(x => {
        console.log('axios upload', x);
        return x;
      })
      .then(x => x.data)
      // add url field
      .then(x =>
        x.map(img =>
          Object.assign({}, img, {
            url: `${stedsServer}/Coppermine/${img.url}`
          })
        )
      )
  );
}

export { upload };
