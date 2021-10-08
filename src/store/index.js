import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/index'
import post from './module/post'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    isLoading : true,
    user: {},
    postsOfUserUID: [],
    userPhotoPreview : null,

    userUID : '',
    userName: '',
    userPhotoURL  : '',
    coverImageURL : '',
    phoneNumber : '',
    passWord : '',
    dateOfBirth: '',
    gender: '',

    posts: [],
    messages: [],

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
      state.user = doc.data()
      state.userUID = doc.id
      state.userName = doc.data().userName
      state.passWord = doc.data().passWord
      state.dateOfBirth = doc.data().dateOfBirth
      state.gender = doc.data().gender
      state.phoneNumber = doc.data().phoneNumber
      state.userPhotoURL = doc.data().userPhotoURL
      state.coverImageURL = doc.data().coverImageURL
    },
    setDefaultProfileInfo(state) {
      state.user = {}
      state.userUID = ''
      state.userName = ''
      state.passWord = ''
      state.dateOfBirth = ''
      state.gender = ''
      state.phoneNumber = ''
      state.userPhotoURL = ''
      state.coverImageURL = ''
    },
    setUserPhotoPreview(state) {
      state.userPhotoPreview = !state.userPhotoPreview
    }
  
   
  },
  actions: {
    async getCurrentUser({commit}) {
      await db.collection('users').doc(firebase.auth().currentUser.uid)
      .onSnapshot(
        (querySnapshot) => {
            commit("setProfileInfo", querySnapshot)
      })
      // const dbResults = await dataBase.get()
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
            state.posts.sort((a,b) => { 
              return parseInt(b.date) - parseInt(a.date)
            })

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
    post,
    user
  }
})