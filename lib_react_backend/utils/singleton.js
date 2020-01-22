/**
 * Cria uma função singleton que só pode ser executada uma de cada vez na aplicação inteira,
 * ou seja, dois singletons com o mesmo nome nunca serão executados em paralelo.
 * 
 * Caso uma chamada seja feita para usar o singleton com o mesmo nome de outro que já está
 * sendo executado, a última chamada será ignorada. Só será possível utilizar o singleton
 * novamente uma vez que ele finalizar seu processo de callback. Se não houver nenhum singleton
 * com o nome rodando, o callback será rodado imediatamente.
 * 
 * O Callback oferece suporte a Promises.
 * @param {String} name O Nome da função singleton.
 * @param {Function} callback O Callback a ser executado.
 */
module.exports = async (name, callback) => {
  if (!global.singleton) {
    global.singleton = {};
  }

  if (global.singleton[name]) {
    // Já está executando.
    console.log('Singleton "', name, '" negado!');
    return;
  }

  try {
    global.singleton[name] = true;
    await callback();
  } catch(ex) {

  } finally {
    global.singleton[name] = false;
  }
};
