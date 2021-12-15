import { Address, OptsNetworkTypeOptional } from './types';

type UsdtCurrency = typeof import('./currencies/usdt').usdtCurrency;

type Currency = UsdtCurrency;
type CurrencyAddressType = keyof UsdtCurrency['addressTypes'];

type UsdtValidatorOptions = {
    chainType?: 'erc20' | 'omni';
};

const BTCValidator = require('./bitcoin_validator');
const ETHValidator = require('./ethereum_validator');

function checkBothValidators(address: Address, currency: Currency, networkType?: CurrencyAddressType) {
    const result = BTCValidator.isValidAddress(address, currency, networkType);
    return result || ETHValidator.isValidAddress(address, currency, networkType);
}

const USDTValidator = {
    isValidAddress(
        address: Address,
        currency: Currency,
        opts?: OptsNetworkTypeOptional<CurrencyAddressType> & UsdtValidatorOptions,
    ) {
        if (opts) {
            if (opts.chainType === 'erc20') {
                return ETHValidator.isValidAddress(address, currency, opts.networkType);
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
