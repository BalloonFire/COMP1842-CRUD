<template>
    <div>
      <h1>Word List (Total: {{ filteredWords.length }})</h1>
      <input type="text" v-model="input" placeholder="Search words..." />
      <table id="words" class="ui celled compact table">
        <thead>
          <tr>
            <th>Date Created</th>
            <th>English</th>
            <th>German</th>
            <th>French</th>
            <th>Vietnam</th>
            <th colspan="3"></th>
          </tr>
        </thead>
        
        <tr v-for="(word, i) in paginatedWords" :key="i">
            <td>{{ new Date(word.createdAt).toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }}</td>
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.french }}</td>
            <td>{{ word.vietnam }}</td>
            <td width="75" class="center aligned">
          <router-link :to="{ name: 'display', params: { id: word._id }}">Show</router-link></td>
            <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link></td>
            <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
            <a :href="`/words/${word._id}`">Delete</a></td>
        </tr>
      </table>
      <div class="pageBox">
        <paginate
          :page-count="pageCount"
          :page-range=3
          :click-handler="pageClick"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
        ></paginate>
      </div>
    </div>
  </template>
  
  <script>
  import Paginate from 'vuejs-paginate'
  import { api } from '../helpers/helpers';

  export default {
    name: 'words',
    data() {
      return {
        words: [],
        currentPage: 1,
        wordsperPage: 10,
        input: ''
      };
    },
    components: {
      Paginate
    },
    computed: {
      pageCount() {
        if (this.input === '') {
          return Math.ceil(this.words.length / this.wordsperPage);
        } else {
          const filteredWords = this.filterWords();
          return Math.ceil(filteredWords.length / this.wordsperPage);
        }
      },
      paginatedWords() {
        const filteredWords = this.filterWords();
        console.log('filteredWords:', filteredWords.length);
        const first = (this.currentPage - 1) * this.wordsperPage;
        const last = first + this.wordsperPage;
        return filteredWords.slice(first, last);
      },
      filteredWords() {
        const filteredWords = this.filterWords();
        return filteredWords;
    }
    },
    watch: {
      input() {
        this.currentPage = 1;
      }
    },
    methods: {
      filterWords() {
        return this.words.filter((word) => {
          const english = word.english ? word.english.toLowerCase() : '';
          const german = word.german ? word.german.toLowerCase() : '';
          const french = word.french ? word.french.toLowerCase() : '';
          const vietnam = word.vietnam ? word.vietnam.toLowerCase() : '';
          const search = this.input.toLowerCase();
          return english.includes(search) || german.includes(search) || french.includes(search) || vietnam.includes(search);
        });
      },
      pageClick(pageNum) {
        this.currentPage = pageNum;
      },
      async onDestroy(id) {
        const sure = window.confirm('Are you sure?');
        if (!sure) return;
        await api.deleteWord(id);
        this.flash('Word deleted!', 'success');
        const newWords = this.words.filter(word => word._id !== id);
        this.words = newWords;
      }
    },
    async mounted() {
      this.words = await api.getWords();
      console.log('words:', words);
    }
  };
  </script>

  <style>
  .pageBox {
    display: flex;
    justify-content: center;
  }
  .pagination > li > a, .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination > li {
      display: inline;
  }
  .pagination {
      display: inline-block;
      padding-left: 0;
      margin: 20px 0;
      border-radius: 4px;
  }.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
      z-index: 2;
      color: #fff;
      cursor: default;
      background-color: #337ab7;
      border-color: #337ab7;
  }
  .pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
      color: #777;
      cursor: not-allowed;
      background-color: #fff;
      border-color: #ddd;
  }
  </style>
  