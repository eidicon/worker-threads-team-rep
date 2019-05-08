# Worker threads usage

*Stability: 1 - Experimental*

## Contents:
  - [Example: receiving message from parent thread in a child thread](workerThreads1.js)
  - [Example: creating child thread with predefined data](workerThreads2.js)
  - [Example: usage of a message exchange between messagePorts (asynchronous, two-way communications channel)](workerThreads3.js)
  - [Example: race condition](raceCondition.js)

#### *Resolving race conditions*

  - [Example: atomics](atomics.js)
  - [Example: binary semaphore](semaphoreExample.js)
  - [Example: mutex](mutexExample.js)


#### *Links:*
  - [HowProgrammingWorks/Threads][1]
  - [HowProgrammingWorks/Mutex][2]
  - [Shared memory and multithreading in Node.js - Timur Shemsedinov - JSFest'19][3]
  - [Worker threads][4]
  - [Atomics][5]

#### *WIKI:*
  - [Race Condition][11]
  - [Binary Semaphore][12]
  - [Mutex][13]

[1]: https://github.com/HowProgrammingWorks/Threads
[2]: https://github.com/HowProgrammingWorks/Mutex
[3]: https://www.slideshare.net/tshemsedinov/shared-memory-and-multithreading-in-nodejs-timur-shemsedinov-jsfest19
[4]: https://nodejs.org/api/worker_threads.html
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics
[11]: https://en.wikipedia.org/wiki/Race_condition
[12]: https://en.wikipedia.org/wiki/Semaphore_(programming)
[13]: https://en.wikipedia.org/wiki/Mutual_exclusion