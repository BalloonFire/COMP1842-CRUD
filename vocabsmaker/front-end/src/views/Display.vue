<template>
    <div>
      <h1>Display Word</h1>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly  :value="word.english"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly  :value="word.german"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="france flag"></i> French
        </div>
        <input type="text" readonly  :value="word.french"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnam
        </div>
        <input type="text" readonly  :value="word.vietnam"/>
      </div>
      <div class="actions">
        <button class="positive ui button" @click="$router.push({ name: 'edit', params: { id: $route.params.id } })">
          Edit word
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  
  export default {
    name: 'display',
    data() {
      return {
        word: ''
      };
    },
    async mounted() {
      this.word = await api.getWord(this.$route.params.id);
    }
  };
  </script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }
  </style>