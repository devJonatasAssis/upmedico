export default (state = '', action) => {
  if (action.type === 'on_filtrar_itens') {
    return action.valor;
  }
  return state;
};
