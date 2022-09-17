interface optionsType {
    once?: boolean,
    context?: any
  }
  
export as namespace events;

export function onEvent(eventName: string, handler: any, options: optionsType):void;
export function offEvent(eventName: string, handler: any, options: optionsType):void;
export function emitEvent(eventName: string, payload: any):void;
export function useEvent(eventName: string, handler: any, deps: [], options: optionsType):void;
