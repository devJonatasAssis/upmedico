export default (state = false, action) => {
  if (action.type === 'connect_socket') {
    return true;
  }
  return state;
};
