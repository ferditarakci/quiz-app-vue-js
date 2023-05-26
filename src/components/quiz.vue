<template>
	<div class="questions">
		<div class="question loading" v-if="isLoading">
			<h2>&nbsp;</h2>
			<label v-for="(option, index) in 4" :key="index">
				<input type="radio" name="question" :value="index" />
				<span>&nbsp;</span>
			</label>
		</div>
		<div
			class="question"
			v-else
			v-for="(question, questionIndex) in questions"
			:key="questionIndex"
			v-show="questionIndex === questionSelectedIndex"
		>
			<h2>{{ question.title }}</h2>
			<code v-if="question.description">{{ question.description }}</code>
			<label v-for="option in question.options" :key="option.id">
				<input
					type="radio"
					name="question"
					:value="option.id"
					@change="isChecked(questionIndex, option.id)"
				/>
				<span>
					{{ option.text }}
				</span>
			</label>
		</div>
	</div>
	<div class="mt-3 d-flex align-items-center justify-content-between">
		<div>
			<span class="timer">{{ timerText }}</span>
		</div>
		<div class="text-end">
			<button
				class="btn"
				:class="{
					'btn-success': !isDisabled,
					'btn-secondary': isDisabled,
					'btn-loading': isBtnLoading,
				}"
				:disabled="isDisabled"
				@click="saveAndNext"
			>
				Save and Continue
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Quiz',

	emits: ['quizScore'],

	created() {
		this.questionsFetch()
		this.timer = this.defaultTimer
	},

	data() {
		return {
			defaultTimer: 10,
			timer: 0,
			timerText: '',
			isLoading: true,
			isBtnLoading: false,
			isDisabled: true,
			questions: [],
			questionSelectedIndex: 0,
			answer: null,
		}
	},

	methods: {
		questionsFetch() {
			fetch('./data/questions.json')
				.then((response) => response.json())
				.then((response) => {
					this.questions = response.questions
				})
				.catch((error) => {
					console.error(error)
					alert('Questions could not be loaded')
				})
				.finally(() => {
					setTimeout(() => {
						this.isLoading = false
					}, 1000)
				})
		},

		isChecked(questionIndex, optionIndex) {
			this.questionSelectedIndex = questionIndex
			this.answer = optionIndex
			this.isDisabled = false
		},

		saveAndNext(auto = false) {
			if (!auto) this.isDisabled = false
			this.isBtnLoading = true

			const index = this.questions[this.questionSelectedIndex]
			index.answer = this.answer
			index.answered = true

			if (this.questions.length - 1 > this.questionSelectedIndex) {
				this.timer = this.defaultTimer

				setTimeout(() => {
					this.questionSelectedIndex++
					this.answer = null
					this.isDisabled = true
					this.isBtnLoading = false
				}, 1000)

				console.table(this.questions)
			} else {
				setTimeout(() => {
					this.$emit('quizScore', this.questions)
				}, 1000)
			}
		},

		startTimer() {
			if (this.questions.length - 1 === this.questionSelectedIndex)
				return false
			console.log('startTimer')
			let minutes, seconds
			this.startTimerVal = setInterval(() => {
				minutes = parseInt(this.timer / 60, 10)
				seconds = parseInt(this.timer % 60, 10)

				minutes = minutes < 10 ? '0' + minutes : minutes
				seconds = seconds < 10 ? '0' + seconds : seconds

				this.timerText = minutes + ':' + seconds

				if (--this.timer < 0) {
					this.timer = 0
					this.saveAndNext(true)
				}
			}, 1000)
		},
	},

	mounted() {
		this.startTimer()
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/quiz.scss';
</style>
