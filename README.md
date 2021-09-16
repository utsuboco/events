# @utsubo/events

Minimalist library to emit and receive custom events. `useEvents` will automatically attach events when mounted and detach them when unmounted.


```jsx
import {emitEvents, useEvents} from '@utsubo/events'

emitEvent('hello', 5)


const DummyComponent = () => {
  useEvents('hello', (payload) => {
    // payload = 5
  }, {once: false})

  return null
}
```
