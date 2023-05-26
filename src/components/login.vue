<template>
	<form
		@submit.prevent="submitForm"
		class="login-form"
		method="post"
		novalidate
	>
		<div class="form-label mb-3">
			<label for="fullname">Full Name</label>
			<input
				v-model="fullname"
				name="fullname"
				id="fullname"
				type="text"
				class="form-control"
				required
			/>
			<div v-if="isName" class="invalid-feedback">
				Please enter full name
			</div>
		</div>
		<div class="form-label mb-3">
			<label for="email">E-mail Address</label>
			<input
				v-model="email"
				name="email"
				id="email"
				type="text"
				class="form-control"
				required
			/>
			<div v-if="isEmail" class="invalid-feedback">
				Please enter e-mail address
			</div>
		</div>
		<div class="text-end">
			<button class="btn btn-success" type="submit">
				Start The Quiz
			</button>
		</div>
	</form>
</template>

<script>
export default {
	name: 'Login',

	data() {
		return {
			isName: false,
			isEmail: false,
			fullname: '',
			email: '',
		}
	},

	methods: {
		submitForm(event) {
			if (!(this.fullname && this.email)) {
				this.isName = true
				this.isEmail = true
				event.target.classList.add('was-validated')
				return false
			}

			let values = {
				isLogin: true,
				fullname: this.fullname,
				email: this.email,
			}

			sessionStorage.setItem('user', JSON.stringify(values))
			this.$emit('submitFormData', values)
		},
	},
}
</script>

<style lang="scss" scoped>
.login-form {
	label {
		margin-bottom: 0.25rem;
		font-weight: 600;
	}
}
</style>
