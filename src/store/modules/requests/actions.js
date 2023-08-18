export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(
      `https://vuejs-aa909-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send request!');
    }

    context.commit('addRequest', {
      ...newRequest,
      id: responseData.name,
      coachId: payload.coachId
    });
  },
  async loadRequests(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vuejs-aa909-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: userId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
  hideContactButton(context) {
    context.commit('hideContactButton');
  },
  showContactButton(context) {
    context.commit('showContactButton');
  }
};