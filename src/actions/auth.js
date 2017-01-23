export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED';

const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const notAuthorized = () => ({ type: NOT_AUTHORIZED });

export const loginViaFacebook = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.auth.isAuthenticated) {
      dispatch(loginSuccess());
    } else {
      /* eslint-disable */
      FB.login((response) => {
        if (response.status === 'connected') {
          dispatch(loginSuccess());
        } else if (response.status === 'not_authorized') {
          dispatch(notAuthorized());
        } else {
          console.log('catch that case');
        }
      });
    }
  };
};
