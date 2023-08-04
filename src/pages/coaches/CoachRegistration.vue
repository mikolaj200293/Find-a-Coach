<template>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <base-card v-else>
            <h2>Register as a coach</h2>
            <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';

export default {
    components: {BaseDialog, CoachForm},
    data() {
        return {
            isLoading: false,
            error: null
        };
    },
    methods: {
        async saveData(data) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/registerCoach', data);
            } catch (error) {
                this.error = 'Something went wrong on coach registration. Try again later.';
            }
            this.isLoading = false;
            if (!this.error) {
                this.$router.replace('/coaches');
            }
        },
        handleError() {
            this.error = null;
        },
    }
};
</script>

<style scoped>

</style>