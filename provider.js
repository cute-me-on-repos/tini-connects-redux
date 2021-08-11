import { isFunction, isPlainObject, warn } from './utils'
const providerStore = my
const genLifetimes = (component2 = false) => ({
  page: ['onLoad', 'onUnload'],
  component: [component2 ? 'onInit' : 'didMount', 'didUnmount'],
})
export function setProvider(provider) {
  if (!isPlainObject(provider)) {
    warn('provider must be an Object')
  }
  const { store, namespace = '', component2 = false } = provider
  if (
    !store ||
    !isFunction(store.getState) ||
    !isFunction(store.dispatch) ||
    !isFunction(store.subscribe)
  ) {
    warn('Invalid store')
  }
  providerStore.__REDUX_BINDINGS_PROVIDER__ = {
    store,
    lifetimes: genLifetimes(component2),
    namespace,
  }
}
export function getProvider() {
  if (!providerStore.__REDUX_BINDINGS_PROVIDER__) {
    warn('Please setup provider first')
  }
  return providerStore.__REDUX_BINDINGS_PROVIDER__
}
