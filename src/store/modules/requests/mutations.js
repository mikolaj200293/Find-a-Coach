export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
    setRequests(state, payload) {
    state.requests = payload;
  },
  hideContactButton(state) {
    state.contactButtonVisible = false;
  },
  showContactButton(state) {
    state.contactButtonVisible = true;
  }
};