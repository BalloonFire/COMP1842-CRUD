<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="france flag"></i> French
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.french" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="vietnam flag"></i> Vietnam
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.vietnam" />
    </div>

    <div class="ui buttons">
      <button class="positive ui button">Submit</button>
      <button class="negative ui button" @click.prevent="clearAll">Clear All</button>
      <button class="positive ui button" @click.prevent="translateAll">Translate All</button>      
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'word-form',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => ({
        english: '',
        german: '',
        french: '',
        vietnam: ''
      })
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit: function() {
      if (this.word.english === '' || this.word.german === '' || this.word.french === '' || this.word.vietnam === '') {
        this.errorsPresent = true;
      } else {
        this.$emit('createOrUpdate', this.word);
      }
    },
    async translateText(text, sourceLang, targetLang) {
      const url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyCPx4PRNs5-y2ZZA0qcsBvdMbtk9scXVIs`;
      const response = await axios.post(url, {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      });
      return response.data.data.translations[0].translatedText;
    },
    translateAll() {
      const promises = [];

      if (this.word.english) {
        promises.push(this.translateText(this.word.english, 'en', 'de').then(translated => {
          this.word.german = translated;
        }));
        promises.push(this.translateText(this.word.english, 'en', 'fr').then(translated => {
          this.word.french = translated;
        }));
        promises.push(this.translateText(this.word.english, 'en', 'vi').then(translated => {
          this.word.vietnam = translated;
        }));
      }

      if (this.word.german) {
        promises.push(this.translateText(this.word.german, 'de', 'en').then(translated => {
          this.word.english = translated;
        }));
        promises.push(this.translateText(this.word.german, 'de', 'fr').then(translated => {
          this.word.french = translated;
        }));
        promises.push(this.translateText(this.word.german, 'de', 'vi').then(translated => {
          this.word.vietnam = translated;
        }));
      }

      if (this.word.french) {
        promises.push(this.translateText(this.word.french, 'fr', 'en').then(translated => {
          this.word.english = translated;
        }));
        promises.push(this.translateText(this.word.french, 'fr', 'de').then(translated => {
          this.word.german = translated;
        }));
        promises.push(this.translateText(this.word.french, 'fr', 'vi').then(translated => {
          this.word.vietnam = translated;
        }));
      }

      if (this.word.vietnam) {
        promises.push(this.translateText(this.word.vietnam, 'vi', 'en').then(translated => {
          this.word.english = translated;
        }));
        promises.push(this.translateText(this.word.vietnam, 'vi', 'de').then(translated => {
          this.word.german = translated;
        }));
        promises.push(this.translateText(this.word.vietnam, 'vi', 'fr').then(translated => {
          this.word.french = translated;
        }));
      }

      Promise.all(promises).then(() => {
        console.log('Translation Success!');
      });
    },
    clearAll() {
      this.word.english = '';
      this.word.german = '';
      this.word.french = '';
      this.word.vietnam = '';
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.ui.buttons {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.ui.buttons button {
  margin: 0 10px;
}
</style>
