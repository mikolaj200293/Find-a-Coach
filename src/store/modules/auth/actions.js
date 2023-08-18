let timer;

export default {
  async auth(context, payload) {
    const authType = payload.mode === 'login' ? 'signInWithPassword' : 'signUp';
    const userCredentials = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    };

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=AIzaSyDULBDrl2aUNk1VGDyOn22UHtR_Q6K0F3k`,
      {
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify(userCredentials),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error(payload.mode === 'login' ? 'Failed to authenticate. Check your login data.' : 'Failed to sign up. Check your data.');
    }

    const responseData = await response.json();

    const expiresIn = responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    const user = {
      token: responseData.idToken,
      userId: responseData.localId,
    };

    context.commit('setUser', user);
  },
  autoLogin(context) {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 1000) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    const userData = {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
    };
    if (userData.token && userData.userId) {
      context.commit('setUser', userData);
    }
  },
  logout(context) {
    const logout_data = {
      token: null,
      userId: null,
    };
    localStorage.clear();
    clearTimeout(timer);
    context.commit('setUser', logout_data);
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};