export default {
  login() {
  },
  async signup(context, payload) {
    const userData = {
      email: payload.email,
      password: payload.password
    };

    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDULBDrl2aUNk1VGDyOn22UHtR_Q6K0F3k',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        returnSecureToken: true
      });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(response);
      throw new Error(responseData.message || 'Failed to authenticate. Check your login data.');
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  }
};