export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state) {
    return state.userIsCoach;
  }
  // isCoach(_, getters, _2, rootGetters) {
  //   const coaches = getters.coaches;
  //   const userId = rootGetters.userId;
  //   return coaches.some(coach => coach.id === userId);
  // }
};