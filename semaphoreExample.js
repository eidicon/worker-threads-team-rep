'use strict'
/**
 * Binary semaphore example
 * based on atomics
 */
/* eslint no-new: "off" */

const threads = require('worker_threads')
const { Worker, isMainThread, threadId, workerData } = threads
const BinarySemaphore = require('./components/semaphore')

if (isMainThread) {
  const buffer = new SharedArrayBuffer(14) // 14 bytes buffer
  const semaphore = new BinarySemaphore(buffer, 0, true)
  console.dir({ semaphore })
  for (let i = 0; i < 2; i++) {
    new Worker(__filename, { workerData: buffer })
  }
} else {
  const semaphore = new BinarySemaphore(workerData)
  const array = new Int8Array(workerData, 4) // first 4 bytes was used to store semaphore state
  const value = threadId === 1 ? 1 : -1
  setInterval(() => {
    semaphore.enter() // enter critical section
    for (let i = 0; i < 10; i++) { // fills 10 bytes left
      array[i] += value
    }
    console.dir([ { threadId }, { array } ])
    semaphore.leave() // leaving critical section
  }, 100)
}
