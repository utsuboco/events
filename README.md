# @utsubo/events

Minimalist library to emit and receive custom events. `useEvents` will be automatically attached on mounted and detached on unmounted.


```jsx
import {emitEvents, useEvents} from '@utsubo/events'

emitEvent((payload) => {
  // payload = 5
})


const DummyComponent = () => {
  useEvents((payload) => {
    // payload = 5
  }, {once: false})

  return null
}
```