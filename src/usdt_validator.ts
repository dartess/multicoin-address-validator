import { ETHValidator } from './ethereum_validator';

import { Address, OptsNetworkTypeOptional } from './types';

type UsdtCurrency = typeof import('./currencies/usdt').usdtCurrency;

type Currency = UsdtCurrency;
type CurrencyAddressType = keyof UsdtCurrency['addressTypes'];

type UsdtValidatorOptions = {
    chainType?: 'erc20' | 'omni';
};

const BTCValidator = require('./bitcoin_validator');

function checkBothValidators(address: Address, currency: Currency, networkType?: CurrencyAddressType) {
    const result = BTCValidator.isValidAddress(address, currency, networkType);
    return result || ETHValidator.isValidAddress(address);
}

const USDTValidator = {
    isValidAddress(
        address: Address,
        currency: Currency,
        opts?: OptsNetworkTypeOptional<CurrencyAddressType> & UsdtValidatorOptions,
    ) {
        if (opts) {
            if (opts.chainType === 'erc20') {
                return ETHValidator.isValidAddress(address);
            } if (opts.chainType === 'omni') {
                return BTCValidator.isValidAddress(address, currency, opts.networkType);
            }
        }
        return checkBothValidators(address, currency, opts?.networkType);
    },
};

type Validator = Parameters<typeof USDTValidator.isValidAddress>;

export { USDTValidator };
export type { Validator };
