export default (state = [], action) => {
  if (action.type === 'refresh_mesas') {
    return action.mesas;
  }
  return state;
};
