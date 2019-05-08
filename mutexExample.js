'use strict'
/**
 * Mutex example
 * based on atomics
 */
/* eslint no-new: "off" */

const threads = require('worker_threads')
const { Worker, isMainThread, threadId, workerData } = threads
const Mutex = require('./components/mutex')

if (isMainThread) {
  const buffer = new SharedArrayBuffer(8)
  const mutex = new Mutex(buffer, 0, true)
  console.dir({ mutex })
  for (let i = 0; i < 20; i++) {
    new Worker(__filename, { workerData: buffer })
  }
} else {
  const mutex = new Mutex(workerData)
  const array = new Int32Array(workerData, 4)
  if (threadId === 1) {
    for (let i = 0; i < 10000; i++) {
      mutex.enter()
      for (let j = 0; j < array.length; j++) {
        array[j] += 1
      }
      mutex.leave()
    }
    mutex.enter()
    console.dir({ threadId, array })
    mutex.leave()
  } else {
    for (let i = 0; i < 10000; i++) {
      mutex.enter()
      for (let k = 0; k < array.length; k++) {
        array[k] -= 1
      }
      mutex.leave()
    }
    mutex.enter()
    console.dir({ threadId, array })
    mutex.leave()
  }
  console.dir({ array })
}
