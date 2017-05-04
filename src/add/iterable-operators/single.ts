import { IterableX } from '../../iterable';
import { single } from '../../iterable/single';

export function singleProto<T>(
    this: Iterable<T>,
    fn: (value: T) => boolean = () => true): T | undefined {
  return single(this, fn);
}

IterableX.prototype.single = singleProto;

declare module '../../iterable' {
  interface IterableX<T> {
    single: typeof singleProto;
  }
}