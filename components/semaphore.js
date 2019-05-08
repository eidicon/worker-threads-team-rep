'use strict'
const LOCKED = 0
const UNLOCKED = 1

class BinarySemaphore {
  constructor (shared, offset = 0, init = false) {
    this.lock = new Int32Array(shared, offset, 1) // 4 bytes to store lock state see Int32Array.BYTES_PER_ELEMENT
    console.dir(this.lock)
    if (init) Atomics.store(this.lock, 0, UNLOCKED)
  }

  enter () {
    let prev = Atomics.exchange(this.lock, 0, LOCKED)
    while (prev !== UNLOCKED) {
      Atomics.wait(this.lock, 0, LOCKED) // stops looping while lock state is LOCKED (decrease CPU load)
      prev = Atomics.exchange(this.lock, 0, LOCKED)
    }
  }

  leave () {
    if (Atomics.load(this.lock, 0) === UNLOCKED) {
      throw new Error('Cannot leave unlocked BinarySemaphore')
    }
    Atomics.store(this.lock, 0, UNLOCKED)
    Atomics.notify(this.lock, 0, 1)
  }
}

module.exports = BinarySemaphore
