<template>
  <div class="questions scores" :class="{ high: successRate >= 50 }">
    <div class="question">
      <h2>Correct: {{ totalCorrect }} successes out of {{ scores.length }} questions</h2>
      <code>Success Rate: {{ successRate }}%</code>
    </div>
    <div
      class="question"
      v-for="(score, scoreIndex) in scores"
      :key="scoreIndex"
      :class="{ correct: isCorrect(score) }"
    >
      <label>
        <span>{{ Count(scoreIndex) }}: {{ score.title }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizScore',

  props: ['scores'],

  computed: {
    totalCorrect() {
      const result = this.scores
        .filter((o) => o.answer !== null)
        .reduce((acc, o) => {
          if (o.options.find((c) => c.correct).id === o.answer) {
            return acc + 1
          }

          return acc
        }, 0)

      return result
    },

    successRate() {
      return (this.totalCorrect * 100) / this.scores.length
    },
  },

  methods: {
    Count(a) {
      a++
      return a < 10 ? '0' + a : a
    },

    isCorrect(score) {
      const a =
        score.answer !== null && score.options.some((o) => o.correct && o.id === score.answer)
      return a
    },
  },
}
</script>
