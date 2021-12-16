import { ETHValidator } from './ethereum_validator';
import { BTCValidator } from './bitcoin_validator';

import { Address, OptsNetworkTypeOptional } from './types';

type UsdtCurrency = typeof import('./currencies/usdt').usdtCurrency;

type Currency = UsdtCurrency;
type CurrencyNetworkType = keyof UsdtCurrency['addressTypes'];

type UsdtValidatorOptions = {
    chainType?: 'erc20' | 'omni';
};

type Opts = OptsNetworkTypeOptional<CurrencyNetworkType>;

function checkBothValidators(address: Address, currency: Currency, opts?: Opts) {
    const result = BTCValidator.isValidAddress(address, currency, opts);
    return result || ETHValidator.isValidAddress(address);
}

const USDTValidator = {
    isValidAddress(
        address: Address,
        currency: Currency,
        opts?: OptsNetworkTypeOptional<CurrencyNetworkType> & UsdtValidatorOptions,
    ) {
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

type Validator = Parameters<typeof USDTValidator.isValidAddress>;

export { USDTValidator };
export type { Validator };
