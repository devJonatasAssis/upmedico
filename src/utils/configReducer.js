export default (state = {}, action) => {
  if (action.type === 'set_config') {
    global.inputLowercase = action.config.tab_config.status_edit_maiusculo == 'N';
    return {
      ...action.config.tab_config,
    };
  }
  return state;
};