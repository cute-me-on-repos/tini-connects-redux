import diff from './diff';
import handleMapDispatch from './mapDispatch';
import handleMapState from './mapState';
import { getProvider } from './provider';
import subscription from './subscription';
import { getKeys, setProperty as set, warn } from './utils';
const INSTANCE_ID = Symbol('INSTANCE_ID');
export default function connect({ type = 'page', mapState, mapDispatch, manual = false, } = {}) {
    if (type !== 'page' && type !== 'component') {
        warn('The type attribute can only be `Page` or `Component`');
    }
    const isPage = type === 'page';
    const { lifetimes, namespace } = getProvider();
    return function processOption(options) {
        if (Array.isArray(mapState) && mapState.length > 0) {
            const ownState = handleMapState(mapState);
            options.data = Object.assign(options.data || {}, namespace ? { [namespace]: ownState } : ownState);
            const unsubscribeMap = new Map();
            const [onLoadKey, onUnloadKey] = lifetimes[type];
            const oldOnLoad = options[onLoadKey];
            const oldOnUnload = options[onUnloadKey];
            options[onLoadKey] = function (...args) {
                const getData = () => namespace ? this.data[namespace] : this.data;
                const ownState = handleMapState(mapState);
                const diffData = diff(ownState, getData(), namespace);
                if (getKeys(diffData).length > 0) {
                    const newData = Object.assign({}, getData());
                    Object.keys(diffData).forEach((key) => {
                        set(newData, key, diffData[key]);
                    });
                    this.setData(newData);
                }
                const id = Symbol('instanceId');
                const unsubscribe = subscription({ id, data: getData(), setData: this.setData.bind(this) }, mapState);
                unsubscribeMap.set(id, unsubscribe);
                this[INSTANCE_ID] = id;
                if (oldOnLoad) {
                    oldOnLoad.apply(this, args);
                }
            };
            options[onUnloadKey] = function () {
                if (oldOnUnload) {
                    oldOnUnload.apply(this);
                }
                const id = this[INSTANCE_ID];
                if (unsubscribeMap.has(id)) {
                    const unsubscribe = unsubscribeMap.get(id);
                    unsubscribeMap.delete(id);
                    unsubscribe();
                }
            };
        }
        if (mapDispatch) {
            const target = isPage ? options : (options.methods = options.methods || {});
            handleMapDispatch(mapDispatch, target);
        }
        return manual ? options : isPage ? Page(options) : Component(options);
    };
}
export function $page(config = {}) {
    config.type = 'page';
    return connect(config);
}
export function $component(config = {}) {
    config.type = 'component';
    return connect(config);
}
