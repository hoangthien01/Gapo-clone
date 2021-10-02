import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/index'
import post from './module/post'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    user: null,

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
      db.collection("posts")
      .onSnapshot(
        (querySnapshot) => {
          state.posts = []
          querySnapshot.forEach((doc) => {
              state.posts.push(doc.data());
          });
      })
      // const dataBase = await db.collection('posts').orderBy('date', 'desc');
      // const dbResults = await dataBase.get();
      // await dbResults.forEach((doc) => {
      //   // if (!state.posts.some(post => post.blogID === doc.id)) {
      //     const data = {
      //       postID: doc.data().postID,
      //       text : doc.data().text,
      //       avatar : doc.data().avatar,
      //       photoURL: doc.data().photoURL,
      //       date: doc.data().date,
      //       userUID : doc.data().userUID,
      //       userName: doc.data().userName,
      //     };
      //     state.posts.push(data);
      //   // }
      //   console.log(state.posts)
      //   // state.postLoaded = true;
      // });
    },

  },
  modules: {
    post
  }
})