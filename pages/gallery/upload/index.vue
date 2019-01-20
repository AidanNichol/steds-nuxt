<template>
  <div id="upload">
    <Authentication roleReq="0"/>
    <div class="container" v-if="authenticated">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="album">
          <span class="prepend">Album</span>

          <el-select v-model="album" filterable allow-create :style="{width:'15em'}">
            <el-option v-for="alb in albums" :key="alb" :label="alb" :value="alb"></el-option>
          </el-select>&nbsp; &nbsp;
          <el-input v-model="photographer" :style="{width:'20em'}">
            <template slot="prepend">Photographer</template>
          </el-input>
        </div>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*"
            class="input-file"
          >
          <p v-if="isInitial">Drag your file(s) here to begin
            <br>or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" :key="item.id">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
// swap as you need
// import { upload } from './file-upload.fake.service'; // fake service
import Authentication from '~/components/authentication';
import { mapState } from 'vuex';
import {pick} from 'lodash';
import { upload } from '~/utilities/file-upload.service'; // real service
import { wait } from '~/utilities/utils';
import WalksMixin from '~/components/WalksMixin';
import * as axios from 'axios';
import { stedsServer } from '~/assets/js/config';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  name: 'upload',
  mixins: [WalksMixin],
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      albums: [],
      album: null,
      photographer: null,
    };
  },
  components: { Authentication },
  computed: {
    ...mapState('authentication', ['state', 'role', 'name']),
    authenticated() {
      let res = this.state === 2 && this.role >= 0;
      console.log('authenticated', pick(this, ['state', 'role']), res);
      return res;
    },
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  watch: {
    name() {
      this.photographer = this.name;
    },
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    async save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      console.debug('formdata', formData);
      // const url = `${BASE_URL}/photos/upload`;
      try {
        const url = `${stedsServer}/cpg/upload`;
        let ret = await axios.post(url, formData);
        console.log('axios upload', ret);
        this.uploadedFiles = ret.data.map(img =>
          Object.assign({}, img, {
            url: `http://www.stedwardsfellwalkers.co.uk/gallery/albums/${
              img.url
            }`,
          })
        );
        console.log('upload response', this.uploadedFiles);
        this.currentStatus = STATUS_SUCCESS;
      } catch (err) {
        console.error(err);
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      } finally {
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;
      console.log('fileList', fileList);
      formData.set('album', this.album);
      formData.set('photographer', this.photographer);
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x, i) => {
        formData.append(`${fieldName}-${i}`, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    },
  },
  async mounted() {
    let res = await this.getWalkData('GetPastWalks');
    this.albums = res.data;
    this.album = this.albums[0];
    this.photographer = this.name;
    this.reset();
  },
};
</script>

<style lang="scss" >
#upload {
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
  .album {
    li {
      text-align: left;
    }
    .prepend {
      display: inline-block;
      color: #97a8be;
      height: 36px;
      font-size: 14px;
      padding: 9px 10px 0 10px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #97a8be;
      border-right-width: 0;
    }
    .el-select div.el-input input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
