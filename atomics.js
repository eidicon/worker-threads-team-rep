'use strict'
/**
 * Atomics example
 * Atomics operations (load, store and others) ensure that the reading and writing is done safely. basic locking
 */
/* eslint no-new: "off" */
const threads = require('worker_threads')
const { Worker, isMainThread, threadId, workerData } = threads
const AMOUNT_OF_WORKERS = 10
const VALUE_TO_STORE = 100

if (isMainThread) {
  const buffer = new SharedArrayBuffer(32) // created a shared buffer
  for (let i = 0; i < AMOUNT_OF_WORKERS; i++) {
    new Worker(__filename, { workerData: buffer })
  }
} else {
  const bufferView = new Int32Array(workerData) // added view of buffer
  if (threadId === 1) {
    setTimeout(() => { // timeout to wait spawning other workers
      Atomics.store(bufferView, 5, VALUE_TO_STORE) // store 100 at 5 position
      console.dir({ bufferView })
      Atomics.notify(bufferView, 5, 1) // notify one worker
    }, 100)
  } else {
    if (Atomics.wait(bufferView, 5, 0) === 'ok') {
      const arg = Atomics.load(bufferView, 5)
      console.dir({ arg })
      Atomics.add(bufferView, 5, VALUE_TO_STORE)
      Atomics.notify(bufferView, 5, 1) // notify one worker
      console.dir([{ threadId }, { bufferView }])
    }
  }
}
