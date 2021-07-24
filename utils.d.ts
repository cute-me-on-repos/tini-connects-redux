import { IAnyObject } from './types';
export declare const isFunction: (value: unknown) => value is Function;
export declare const isPlainObject: <T extends IAnyObject = IAnyObject>(value: unknown) => value is T;
export declare const getType: (value: unknown) => string;
export declare const getKeys: {
    (o: object): string[];
    (o: {}): string[];
};
export declare const hasOwnProperty: (v: PropertyKey) => boolean;
export declare const warn: (message: string) => never;
