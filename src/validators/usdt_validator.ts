import { ETHValidator } from './ethereum_validator';
import { BTCValidator } from './bitcoin_validator';

import { ExtractNetworkType, OptsNetworkTypeOptional } from '../types';

type UsdtCurrency = typeof import('../currencies/usdt').usdtCurrency;

type Currency = UsdtCurrency;
type CurrencyNetworkType = ExtractNetworkType<Currency>;

type Opts = OptsNetworkTypeOptional<CurrencyNetworkType> & {
    chainType?: 'erc20' | 'omni';
};

function checkBothValidators(address: string, currency: Currency, opts?: Opts) {
    const result = BTCValidator.isValidAddress(address, currency, opts);
    return result || ETHValidator.isValidAddress(address);
}

const USDTValidator = {
    isValidAddress(address: string, currency: Currency, opts?: Opts) {
        if (opts) {
            if (opts.chainType === 'erc20') {
                return ETHValidator.isValidAddress(address);
            } if (opts.chainType === 'omni') {
                return BTCValidator.isValidAddress(address, currency, opts);
            }
        }
        return checkBothValidators(address, currency, opts);
    },
};

type ValidatorParams = Parameters<typeof USDTValidator.isValidAddress>;

export { USDTValidator };
export type { ValidatorParams };
