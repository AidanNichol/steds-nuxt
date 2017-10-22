<template>
  <div class="authentication">
    <div v-show="name" class="name">
      {{name}} ({{identifier}})
      <el-button v-show="state==2" @click="handleLogout" type="warning" size="mini">Log out</el-button>
    </div>
    <div v-if="state===0">This page is only available to {{title}} of the walking club.
      <h4>Authentication required</h4>
    </div>
    <div v-show="state===0" class="identifier">
      <div class="inputbox">
        <div>
          Enter your email address or mobile phone number and press Enter
        </div>
        <!-- <div> -->
          <input v-model="xIdentifier" @keyup.enter="handleIdentifier" placeholder="email or mobile"/>
        <!-- </div> -->

      </div>
      <!-- <button @click="handleIdentifier">submit</button> -->
    </div>
    <div v-show="state===1" class="inputbox">
      <div>You have been sent a verification code via {{via}}. Please enter it here and press enter</div>
      <input v-model="xVerification" @keyup.enter="handleVerification"/>
      <!-- <button @click="handleVerification">submit</button> -->
    </div>
    <el-button v-show="state===1" @click="handleLogout" size="mini">reset</el-button>
    <div class="error" v-if="error"> {{error}} </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// const axios = require('axios');
export default {
  props: ['roleReq'],
  data() {
    return { xIdentifier: '', xVerification: '' };
  },
  async beforeMount() {
    // get current authentication status
    await this.$store.dispatch('authentication/getAuth', this.roleReq);
  },
  computed: {
    ...mapState('authentication', [
      'ip',
      'state',
      'mId',
      'identifier',
      'verificationSeq',
      'authSeq',
      'limit',
      'name',
      'via',
      'error'
    ]),
    title() {
      return ['member', 'committee members', 'administrators'][this.roleReq];
    }
  },

  methods: {
    ...mapActions('authentication', [
      // 'submitVerification',
      // 'submitIdentifier',
      'changeStatus'
    ]),
    handleIdentifier() {
      console.log('handleIdentifier', this.xIdentifier);
      if (this.xIdentifier.indexOf('@') === -1) {
        this.xIdentifier = this.xIdentifier.replace(/[ -.]/, '');
      }
      this.changeStatus(this.xIdentifier, this.roleReq);
    },
    reuseLastTime() {
      this.changeStatus(this.identifier, this.roleReq);
    },
    handleVerification() {
      this.changeStatus(this.xVerification, this.roleReq);
    },
    handleLogout() {
      this.xIdentifier = '';
      this.xVerification = '';
      this.changeStatus('logout');
    }
  }
};
</script>

<style scoped>
.authentication {
  box-sizing: border-box;
  border: thin solid #444444;
  width: 100%;
  border-radius: .2rem;
  padding:0.2em 1em;
  background-color: rgb(242, 218, 200);
  & h4 {
    color: red;
    padding: 0.3em 0;
  }
  & .inputbox {
    border: thin solid #ff8888;
    border-radius: .3em;
    background-color: #f6d0d0;
    width: 40%;
    min-width: 240px;
    padding: .5em;
    /*display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;*/
    & input {
      display: block;
      width: 100%;
      margin-top: .5em;
      background-color: white;
      border:thin solid #888888;
      border-radius: .3em;
      font-size: 1.1em;
    }
  }
  & button {
    font-size: 1.1em;
    padding: 0.2em;
    /*border-radius: 0.2em;*/
  }
}
.debug {
  display: none;
  & div {
    & span {
      display: inline-block;
      width: 200px;
    }
  }
}
.error{
  color: red;
  font-weight: bold;
}
.name {
  width: 100%;
  text-align: right;
}
</style>
