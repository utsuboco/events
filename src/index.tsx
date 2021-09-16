import { useRef, useEffect } from 'react'
import EventEmitter from 'eventemitter3'

interface optionsType {
  once?: boolean
}

const eventEmitter = new EventEmitter()

// vanilla
const onEvent = (eventName: string, handler: any, options: optionsType = {}) => {
  const { once } = options
  if (once) {
    eventEmitter.once(eventName, handler)
  } else {
    eventEmitter.on(eventName, handler)
  }
}

// vanilla
const offEvent = (eventName: string, handler: any, options: optionsType = {}) => {
  const { once } = options
  eventEmitter.removeListener(eventName, handler, null, once ? true : false)
}

// react hook
const useEvent = (eventName: string, handler: any, options: optionsType = {}) => {
  const savedHandler = useRef<any>(null)
  const { once } = options

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {

    const eventListener = (event:any) => savedHandler.current(event)
    if (once) {
      eventEmitter.once(eventName, eventListener)
    } else {
      eventEmitter.on(eventName, eventListener)
    }
    return () => {
      eventEmitter.removeListener(eventName, eventListener, null, once ? true : false)
    }
  }, [eventName, once])
}

const emitEvent = (eventName: string, payload: any) => {
  eventEmitter.emit(eventName, payload)
}

export { emitEvent, useEvent, onEvent, offEvent }
