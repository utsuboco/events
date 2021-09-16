# @utsubo/events

Minimalist library to emit and receive custom events. `useEvent` will automatically attach events when mounted and detach them when unmounted.


```jsx
import {emitEvent, useEvent, onEvent, offEvent} from '@utsubo/events'

emitEvent('hello', 5)

const vanillaFunc = (payload) => { console.log(payload) } // = 5

onEvent('hello', vanillaFunc, {once: false})
// detach event
offEvent('hello', vanillaFunc)


const DummyComponent = () => {
  // automatically attached on mount and detached on unmount
  useEvent('hello', (payload) => {
    // payload = 5
  }, {once: false})

  return null
}
```
