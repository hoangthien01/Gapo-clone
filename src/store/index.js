import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/index'
import post from './module/post'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    isLoading : true,
    user: null,
    postsOfUserUID: [],

    userUID : '',
    userName: '',
    userPhotoURL  : '',
    coverImageURL : '',
    phoneNumber : '',
    passWord : '',
    dateOfBirth: '',
    gender: '',

    posts: []

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
    setUserPhotoURL(state, payload) {
      state.userPhotoURL = payload;
    },
    setCoverImageURL(state, payload) {
      state.coverImageURL = payload;
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
      state.userPhotoURL = doc.data().userPhotoURL
      state.coverImageURL = doc.data().coverImageURL
    },
  
   
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit("setProfileInfo", dbResults)
      // commit("setProfileInitials")
    },
    async getPost({ state }) {
      await db.collection("posts")
      .onSnapshot(
        (querySnapshot) => {
          state.posts = []
          querySnapshot.forEach((doc) => {
              state.posts.push(doc.data());
              if(state.posts.length > 5) state.isLoading = false
          });
      })
    },
    async getPostByUserUID({ state },payload) {
      await db.collection("posts").where("userUID","==",payload)
      .onSnapshot(
        (querySnapshot) => {
          state.postsOfUserUID = []
          querySnapshot.forEach((doc) => {
              state.postsOfUserUID.push(doc.data());
              if(state.postsOfUserUID.length > 5) state.isLoading = false
          });
      })
    },

  },
  modules: {
    post
  }
})