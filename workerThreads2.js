'use strict'
/**
 * Sending data when creating a new thread
 * Example: creating child thread with predefined data via workerData (clone)
 */

const { Worker, isMainThread, workerData } = require('worker_threads');

if (isMainThread) {
  new Worker(__filename, { workerData: 'Hello, world!' });
} else {
  console.log(`received message from workerData: ${workerData}`);
}