'use strict'
/**
 * receiving message from parent thread in a child thread 
 */

const {Worker, isMainThread, parentPort} = require('worker_threads')

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    console.log(message);
  });
  worker.postMessage('Hello, world!');
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.once('message', (message) => {
    parentPort.postMessage(`Message received from the main thread: ${message}`);
  });
}
