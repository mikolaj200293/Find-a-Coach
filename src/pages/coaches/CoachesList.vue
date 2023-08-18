<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isAuthenticated">Login to Register as a Coach</base-button>
                    <base-button link to="/register" v-if="coachRegistrationEnabled">Register coach
                    </base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item
                        v-for="coach in filteredCoaches"
                        :key="coach.id" :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
                    ></coach-item>
                </ul>
                <h3 v-else>No coaches found.</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
    components: {BaseButton, BaseDialog, CoachFilter, CoachItem},
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: false,
            error: null,
        };
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters["coaches/coaches"];
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                return this.activeFilters.career && coach.areas.includes('career');
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
        coachRegistrationEnabled() {
            return !this.isCoach && !this.isLoading && this.isAuthenticated
        }
    },
    methods: {
        handleError() {
            this.error = null;
        },
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(force = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: force});
            } catch (error) {
                this.error = error.message || 'Something went wrong on coaches load. Try again later.';
            }
            this.isLoading = false;
        }
    },
    created() {
        this.loadCoaches();
    }
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>