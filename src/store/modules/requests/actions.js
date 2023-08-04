export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };
    context.commit('addRequest', newRequest);
  },
  hideContactButton(context) {
    context.commit('hideContactButton');
  },
  showContactButton(context) {
    context.commit('showContactButton');
  }
};