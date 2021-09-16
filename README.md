# @utsubo/events

Minimalist library to emit and receive custom events. `useEvents` will be automatically attached on mounted and detached on unmounted.


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