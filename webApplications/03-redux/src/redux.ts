import { Action, AnyState, Reducer, Store, StoreCreator, Unsubscribe } from './types';

const createStore = (reducer: Reducer, initialState?: AnyState, enhancer?: any): Store => {
  if (typeof reducer !== 'function') {
    throw new Error('Reducer must be a function');
  }
  if (typeof enhancer !== 'undefined' && typeof enhancer !== 'function') {
    throw new Error('Enhancer must be a function');
  }
  if (typeof enhancer === 'undefined' && typeof initialState === 'function') {
    enhancer = initialState;
    initialState = undefined;
  }
  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = initialState || reducer(initialState, { type: undefined });
  const listeners = new Map();
  let listenerId = 0;

  return {
    dispatch(action): void {
      if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property');
      }
      state = reducer(state, action);
      [...listeners.values()].forEach(value => value());
    },
    getState: () => state,
    subscribe(listener: () => void): Unsubscribe {
      if (typeof listener !== 'function') {
        throw new Error('Listener must be a function');
      }
      const cur = listenerId++;
      listeners.set(cur, listener);

      return () => {
        listeners.delete(cur);
      };
    }
  };
};

const applyMiddleware = (...middleware: any[]) => (
  storeCreator: (reducer: Reducer, state?: AnyState) => Store
) => (reducer: Reducer, state?: AnyState) => {
  const store = storeCreator(reducer, state);

  const dispatch = middleware
    .map(m =>
      m({
        getState: store.getState,
        dispatch: (action: Action) => dispatch(action)
      })
    )
    .reduce((acc, cur) => (m: any) => acc(cur(m)))(store.dispatch);

  return {
    ...store,
    dispatch
  };
};

export { createStore, applyMiddleware };
