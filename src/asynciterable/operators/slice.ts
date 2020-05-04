import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class SliceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: AsyncIterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const source = wrapWithAbort(this._source, signal);
    const it = source[Symbol.asyncIterator]();
    let begin = this._begin;
    let next;
    while (begin > 0 && !(next = await it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = await it.next()).done) {
        yield next.value;
        if (--end === 0) {
          break;
        }
      }
    }
  }
}

/**
 * Returns the elements from the source observable sequence only after the function that returns a promise produces an element.
 *
 * @export
 * @template TSource
 * @param {number} begin
 * @param {number} [end=Infinity]
 * @returns {MonoTypeOperatorAsyncFunction<TSource>}
 */
export function slice<TSource>(
  begin: number,
  end: number = Infinity
): MonoTypeOperatorAsyncFunction<TSource> {
  return function sliceOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SliceAsyncIterable<TSource>(source, begin, end);
  };
}
