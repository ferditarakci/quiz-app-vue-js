<template>
  <div class="container">
    <header class="mb-4 pb-3 border-bottom text-center">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div v-if="fullname" class="pt-4 mt-4 border-top text-start">
        <h2>Welcome, {{ fullname }}</h2>
        <div>
          <strong>E-mail:</strong>
          {{ email }}
        </div>
        <a class="logout" @click="logout()">Log out</a>
      </div>
    </header>
    <Login v-if="!isLogin" @submitFormData="submitFormData" />
    <Quiz v-if="isLogin && !isQuizEnd" @quizScore="quizScore" />
    <QuizScore v-if="isLogin && isQuizEnd" :scores="scoreData" />
  </div>
  <footer class="py-4 text-center">
    <h2 class="repository">
      <a
        href="https://github.com/ferditarakci/quiz-app-vue3"
        title="JavaScript Quiz App"
        aria-label="JavaScript Quiz App"
        target="_blank"
      >
        GitHub Repository
      </a>
      &lt; = &gt;
      <a
        href="https://www.ferditarakci.com.tr"
        title="Front End Web Developer"
        aria-label="Front End Web Developer"
        target="_blank"
      >
        Developed by Ferdi Tarakci
      </a>
    </h2>
  </footer>
</template>

<script>
// import metaData from './data/MetaData.json'
import Login from './components/Login.vue'
import Quiz from './components/Quiz.vue'
import QuizScore from './components/QuizScore.vue'

export default {
  name: 'QuizApp',

  components: {
    Login,
    Quiz,
    QuizScore,
  },

  created() {
    const { isLogin, fullname, email } = JSON.parse(sessionStorage.getItem('user')) || {}
    this.isLogin = isLogin
    this.fullname = fullname
    this.email = email
  },

  data() {
    return {
      title: '',
      description: '',
      isLogin: false,
      isQuizEnd: false,
      fullname: '',
      email: '',
      scoreData: [],
    }
  },

  methods: {
    submitFormData(data) {
      this.isLogin = data.isLogin
      this.fullname = data.fullname
      this.email = data.email
    },

    quizScore(value) {
      this.scoreData = value
      this.isQuizEnd = true
    },

    logout() {
      this.isLogin = false
      this.fullname = ''
      this.email = ''
      sessionStorage.removeItem('user')
    },
  },
}
</script>

<style lang="scss">
@use './assets/scss/styles.scss';
</style>
