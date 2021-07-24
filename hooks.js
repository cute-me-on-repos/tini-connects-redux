import { getProvider } from './provider';
export const useStore = () => getProvider().store;
export const useState = () => getProvider().store.getState();
export const useDispatch = () => getProvider().store.dispatch;
export function useSubscribe(handler) {
    const { store } = getProvider();
    let prevState = store.getState();
    return store.subscribe(() => {
        const currState = store.getState();
        handler(currState, prevState);
        prevState = currState;
    });
}
export function useRef(selector) {
    const { store } = getProvider();
    const ref = {};
    Object.defineProperty(ref, 'value', {
        configurable: false,
        enumerable: true,
        get() {
            return selector(store.getState());
        },
    });
    return ref;
}
export function useSelector(selector, deps) {
    if (!Array.isArray(deps) || deps.length < 1) {
        return selector;
    }
    let lastState = {};
    let lastResult;
    return function (state) {
        if (deps.some((k) => lastState[k] !== state[k])) {
            lastState = state;
            lastResult = selector(state);
        }
        return lastResult;
    };
}
