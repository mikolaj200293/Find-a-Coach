<template>
    <div>
        <base-dialog :show="!!error" title="An error occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{invalid: !email.isValid}">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"/>
                </div>
                <p v-if="!email.isValid">The e-mail address is incorrect.</p>
                <div class="form-control" :class="{invalid: !password.isValid}">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')"/>
                </div>
                <p v-if="!password.isValid">Password must be at least 6 characters long.</p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{
                        switchModeButtonCation
                    }}
                </base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';

export default {
    components: {BaseDialog, BaseSpinner},
    data() {
        return {
            email: {
                val: '',
                isValid: true
            },
            password: {
                val: '',
                isValid: true
            },
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'login') {
                return 'Login';
            } else {
                return 'Signup';
            }
        },
        switchModeButtonCation() {
            if (this.mode === 'login') {
                return 'Signup instead';
            } else {
                return 'Login instead';
            }
        }
    },
    methods: {
        handleError() {
            this.error = null;
        },
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.email.val === '' || !this.email.val.includes('@')) {
                this.email.isValid = false;
                this.formIsValid = false;
            }
            if (this.password.val.length < 6) {
                this.password.isValid = false;
                this.formIsValid = false;
            }
        },
        async submitForm() {
            this.validateForm();

            if (!this.formIsValid) {
                return;
            }

            this.isLoading = true;

            const formData = {
                email: this.email.val,
                password: this.password.val,
            };

            try {
                if (this.mode === 'login') {
                    // ...
                } else {
                    await this.$store.dispatch('signup', formData);
                }
            } catch (error) {
                this.error = error.message || 'Something went wrong on user registration. Try again later.';
            }

            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        }
    }
};
</script>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>