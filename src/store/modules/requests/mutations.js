export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  hideContactButton(state) {
    state.contactButtonVisible = false;
  },
  showContactButton(state) {
    state.contactButtonVisible = true;
  }
};