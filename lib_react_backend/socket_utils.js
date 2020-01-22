const express = require('express');
const io = require('socket.io');
const server  = require('http').createServer(express());

/**
 * Cria um servidor de socket na mesma porta que o servidor express.
 * @param {Express} _server O Servidor express ou HTTP.
 */
function criarServidor(_server, opts) {
  const serverPadrao = (_server || server);
  const io2 = io.listen(serverPadrao.httpServer, opts || {});
  return io2;
}

/**
 * Cria um servidor de socket na porta especificada.
 * @param {String|Number} port A Porta do servidor de socket.
 */
function criarServidorNaPorta(port, opts) {
  return io.listen(port, opts);
}

/**
 * Percorre cada socket e manda no callback
 * o objeto de socket, o segundo parâmêtro 
 */
function forEachSocket(IO, callback) {
  for (const key in IO.sockets.sockets) {
    if (IO.sockets.sockets.hasOwnProperty(key)) {
      let finalizado = false;
      callback(IO.sockets.sockets[key], () => { finalizado = true; });
      if (finalizado) {
        return;
      }
    }
  }
}

/**
 * Retorna um socket de acordo com uma propriedade 
 * dele, é retornado um array para os casos onde tenha mais de um socket
 * com a mesma proprieda e valor.
 */
function getSocketByProperty(IO, prop, value) {
  const arr = [];
  for (const key in IO.sockets.sockets) {
    if (IO.sockets.sockets.hasOwnProperty(key)) {
      if (IO.sockets.sockets[key][prop] === value) {
        arr.push(IO.sockets.sockets[key]);
      }
    }
  }
  return arr;
}

exports.criarServidor = criarServidor;
exports.forEachSocket = forEachSocket;
exports.getSocketByProperty = getSocketByProperty;
exports.criarServidorNaPorta = criarServidorNaPorta;
