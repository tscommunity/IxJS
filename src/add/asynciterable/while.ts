import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { whileDo as _whileDo } from '../../asynciterable/whiledo';

/** @nocollapse */
AsyncIterableX.whileDo = _whileDo;

export declare namespace asynciterable {
  let whileDo: typeof _whileDo;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export { _whileDo as whileDo };
  }
}
