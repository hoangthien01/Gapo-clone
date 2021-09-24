import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    user: null,

    userUID : '',
    userName: '',
    phoneNumber : '',
    passWord : '',
    dateOfBirth: '',
    gender: '',
  },
  getters: {
   
  },
  mutations: {
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserUID(state, payload) {
      state.userUID = payload;
    },
    setPassWord(state, payload) {
      state.passWord = payload;
    },
    setDateOfBirth(state, payload) {
      state.dateOfBirth = payload;
    },
    setGender(state, payload) {
      state.gender = payload;
    },
    setPhoneNumber(state, payload) {
      state.phoneNumber = payload;
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.userUID = doc.id
      state.userName = doc.data().userName
      state.passWord = doc.data().passWord
      state.dateOfBirth = doc.data().dateOfBirth
      state.gender = doc.data().gender
      state.phoneNumber = doc.data().phoneNumber
    },
  
   
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit("setProfileInfo", dbResults)
      // commit("setProfileInitials")
      console.log(this.state.user)
    },
    

  },
  modules: {}
})