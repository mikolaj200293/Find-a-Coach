<template>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">Your E-Mail</label>
            <input id="email" type="email" v-model="email">
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <textarea rows="5" id="message" v-model="message"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and non-empty message.</p>
        <div class="actions">
            <base-button>Send Message</base-button>
        </div>
    </form>
</template>

<script>

import BaseDialog from '@/components/ui/BaseDialog.vue';

export default {
    components: {BaseDialog},
    data() {
        return {
            email: '',
            message: '',
            formIsValid: true,
            isLoading: false,
            error: null
        };
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' ||
                !this.email.includes('@') ||
                this.message === ''
            ) {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/contactCoach', {
                    email: this.email,
                    message: this.message,
                    coachId: this.$route.params.id
                });
            } catch (error) {
                this.error = 'Something went wrong on request send. Try again later.';
            }
            this.isLoading = false;
            if (!this.error) {
                this.$router.replace('/coaches');
            }
        },
        handleError() {
            this.error = null;
        },
    },
    mounted() {
        this.$store.dispatch('requests/hideContactButton');
    },
    unmounted() {
        this.$store.dispatch('requests/showContactButton');
    }
};
</script>

<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
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

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>