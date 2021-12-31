import { useRef, useEffect } from 'react'
import EventEmitter from 'eventemitter3'

interface optionsType {
  once?: boolean,
  context?: any
}

const eventEmitter = new EventEmitter()

// vanilla
const onEvent = (eventName: string, handler: any, options: optionsType = {}) => {
  let context:any = null
  const { once } = options
  if (once) {
    context = eventEmitter.once(eventName, handler)
  } else {
    context = eventEmitter.on(eventName, handler)
  }
  return context
}

// vanilla
const offEvent = (eventName: string, handler: any, options: optionsType = {}) => {
  const { once, context } = options
  eventEmitter.removeListener(eventName, handler, context || null, once ? true : false)
}

// react hook
const useEvent = (eventName: string, handler: any, deps: [], options: optionsType = {}) => {
  const savedHandler = useRef<any>(null)
  const { once } = options

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    let context:any = null
    const eventListener = (event:any) => savedHandler.current(event)
    if (once) {
      context = eventEmitter.once(eventName, eventListener)
    } else {
      context = eventEmitter.on(eventName, eventListener)
    }
    return () => {
      eventEmitter.removeListener(eventName, eventListener, context, once ? true : false)
    }
  }, [eventName, once, ...deps])
}

const emitEvent = (eventName: string, payload: any) => {
  eventEmitter.emit(eventName, payload)
}

export { emitEvent, useEvent, onEvent, offEvent }
