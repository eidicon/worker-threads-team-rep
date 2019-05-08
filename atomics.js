'use strict'
/**
 * Atomics example
 * Atomics operations (load, store and others) ensure that the reading and writing is done safely. (analog of futex). basic locking
 */

/* eslint no-new: "off" */

const threads = require('worker_threads')
const { Worker, isMainThread } = threads

if (isMainThread) {
  const buffer = new SharedArrayBuffer(32) // created a shared buffer
  const amountOfWorkers = 10
  for (let i = 0; i < amountOfWorkers; i++) {
    new Worker(__filename, { workerData: buffer })
  }
} else {
  const { threadId, workerData } = threads
  const bufferView = new Int32Array(workerData) // added view of buffer
  const initVale = 100
  if (threadId === 1) {
    setTimeout(() => { // timeout to wait spawning other workers
      Atomics.store(bufferView, 5, initVale) // store 100 at 5 position
      console.dir({ bufferView })
      const agents = Atomics.notify(bufferView, 5, 1)
      console.log({ agents })
    }, 1000)
  } else {
    if (Atomics.wait(bufferView, 5, 0) === 'ok') {
      const arg = Atomics.load(bufferView, 5)
      console.dir({ arg })
      Atomics.add(bufferView, 5, initVale)
      Atomics.notify(bufferView, 5, 1)
      console.dir({ bufferView })
    }
  }
}
