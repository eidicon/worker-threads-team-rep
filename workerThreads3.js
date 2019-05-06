'use strict'
/**
 * Message Channel
 * Example: usage of a message exchange between messagePorts (asynchronous, two-way communications channel)
 */
const { MessageChannel } = require('worker_threads')

const { port1, port2 } = new MessageChannel()
port1.on('message', message => console.log('received from port2: ', message))
port1.on('close', () => console.log('Message Channel was closed'))

// sent object
port2.postMessage({ foo: 'bar from port2' })

// sent circular data
const circularData = {}
circularData.foo = circularData
port2.postMessage(circularData)

// shared array buffer
const uint8Array = new Uint8Array([ 1, 2, 3, 4 ])

port2.postMessage(uint8Array) // This posts a copy of `uint8Array`:
port2.postMessage(uint8Array, [ uint8Array.buffer ]) // This does not copy data, but renders `uint8Array` unusable:

port2.close() // closing channel
