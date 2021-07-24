import { AnyAction, Dispatch, Store, Unsubscribe } from 'redux';
import { IAnyObject, Ref, Selector, SubscribeHandler } from '../types';
export declare const useStore: () => Store<IAnyObject, AnyAction>;
export declare const useState: () => IAnyObject;
export declare const useDispatch: () => Dispatch<AnyAction>;
export declare function useSubscribe(handler: SubscribeHandler): Unsubscribe;
export declare function useRef<V = unknown>(selector: Selector<V>): Ref<V>;
export declare function useSelector<V = unknown>(selector: Selector<V>, deps?: string[]): Selector<V>;
