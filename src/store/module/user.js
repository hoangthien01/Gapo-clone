import db from '../../firebase/index'


const state = () => ({
  messages : [],
  message: {},
  chatWithUser: {},

})

const mutations = {

}

const actions = {
  async getAllMessages({state}) {
    await db.collection("messages")
      .onSnapshot(
        (querySnapshot) => {
          state.messages = []
          querySnapshot.forEach((doc) => {
              state.messages.push(doc.data());
              // console.log(state.messages)
          });
      })
  },
  async getMessage ({state},messageId) {
      state.chatWithUser = (await db.collection("messages").doc(messageId).get()).data().user1
      await db.collection("messages").doc(messageId)
      .onSnapshot(
        (querySnapshot) => {
          state.message = {}
          state.message= querySnapshot.data();
      })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}