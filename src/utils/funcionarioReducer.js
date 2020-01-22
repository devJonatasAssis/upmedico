export default (state = {}, action) => {
  if (action.type === 'set_funcionario') {
    return {
      ...action.funcionario,
    };
  }
  return state;
};
