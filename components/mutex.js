'use strict'

const LOCKED = 0
const UNLOCKED = 1

class Mutex {
  constructor (shared, offset = 0, initial = false) {
    this.lock = new Int32Array(shared, offset, 1)
    if (initial) Atomics.store(this.lock, 0, UNLOCKED)
    this.owner = false
  }

  enter () {
    let prev = Atomics.exchange(this.lock, 0, LOCKED)
    while (prev !== UNLOCKED) {
      Atomics.wait(this.lock, 0, LOCKED)
      prev = Atomics.exchange(this.lock, 0, LOCKED)
    }
    this.owner = true
    return true
  }

  leave () {
    if (!this.owner) return false
    Atomics.store(this.lock, 0, UNLOCKED)
    Atomics.notify(this.lock, 0, 1)
    this.owner = false
    return true
  }
}

module.exports = Mutex
