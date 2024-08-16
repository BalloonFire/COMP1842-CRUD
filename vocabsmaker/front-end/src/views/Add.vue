<template>
    <div>
      <h1>Add New Words</h1>
      <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
  </template>
  
  <script>
  import WordForm from '../components/WordForm.vue';
  import { api } from '../helpers/helpers';

  export default {
    name: 'add-word',
    components: {
      'word-form': WordForm
    },
    methods: {
      createOrUpdate: async function(word) {
        const res = await api.createWord(word);
        if (res && res._id) {
          this.$router.push({ name: 'display', params: { id: res._id } });
        }
      }
    }
  };
  </script>
  