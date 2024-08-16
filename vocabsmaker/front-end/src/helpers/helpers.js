import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/words/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  getWord: handleError(async id => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getWords: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    try {
      const res = await axios.post(baseURL, payload);
      vm.flash('Word Added!', 'success');
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        vm.flash('Word already exists.', 'error');
      } else {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
      }
    }
  }),
  updateWord: handleError(async (payload) => {
    try {
      const res = await axios.put(baseURL + payload._id, payload);
      vm.flash('Word Updated!', 'success');
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        vm.flash('Word already exists.', 'error');
      } else {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
      }
    }
  }),
  deleteWord: handleError(async id => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  })
};