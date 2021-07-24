import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { getProvider } from '../provider';
import { getKeys } from '../utils';
import diff from './diff';
const queue = [];
export function batchUpdate({ id, data, setData }, updater) {
    const queueItem = queue.find((q) => q.id === id);
    if (queueItem) {
        Object.assign(queueItem.updater, updater);
    }
    else {
        queue.push({ id, rootPath: getProvider().namespace, data: Object.assign({}, data), updater, setData });
    }
    Object.assign(data, updater);
    Promise.resolve().then(update);
}
function update() {
    if (queue.length < 1)
        return;
    let queueItem;
    while ((queueItem = queue.shift())) {
        const diffData = diff(queueItem.updater, queueItem.data, queueItem.rootPath);
        if (getKeys(diffData).length > 0) {
            Object.keys(diffData).forEach((key) => {
                if (queueItem !== undefined)
                    set(queueItem.updater, key, diffData[key]);
            });
            queueItem.setData(cloneDeep(queueItem.updater));
        }
    }
}
