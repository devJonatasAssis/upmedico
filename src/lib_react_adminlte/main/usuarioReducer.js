export default (state = {}, action) => {
  if (action.type === 'on_login') {
    return {
      ...action.usuario,
    };
  }
  return state;
};
