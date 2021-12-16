import { base32Decode } from '../utils/base32';
import { bech32 } from '../crypto/bech32';
import { BTCValidator } from './bitcoin_validator';
import { ExtractNetworkType, OptsNetworkTypeOptional } from '../types';

type BchCurrency = typeof import('../currencies/bch').bchCurrency;
type BscCurrency = typeof import('../currencies/bsv').bsvCurrency;

type Currency = BchCurrency | BscCurrency;
type CurrencyNetworkType = ExtractNetworkType<Currency>;

function validateAddress(address: string, currency: Currency, opts?: OptsNetworkTypeOptional<CurrencyNetworkType>) {
    const networkType = opts ? opts.networkType : '';
    let prefix = 'bitcoincash';
    const regexp = new RegExp(currency.regexp);
    let raw_address: string;

    const res = address.split(':');
    if (res.length === 1) {
        raw_address = address;
    } else {
        if (res[0] !== 'bitcoincash') {
            return false;
        }
        raw_address = res[1];
    }

    if (!regexp.test(raw_address)) {
        return false;
    }

    if (raw_address.toLowerCase() !== raw_address && raw_address.toUpperCase() !== raw_address) {
        return false;
    }

    const decoded = base32Decode(raw_address);
    if (networkType === 'testnet') {
        prefix = 'bchtest';
    }

    try {
        if (bech32.verifyChecksum(prefix, decoded, bech32.encodings.BECH32)) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

const BCHValidator = {
    isValidAddress(address: string, currency: Currency, opts?: OptsNetworkTypeOptional<CurrencyNetworkType>) {
        return validateAddress(address, currency, opts)
            || BTCValidator.isValidAddress(address, currency, opts);
    },
};

type Validator = Parameters<typeof BCHValidator.isValidAddress>;

export { BCHValidator };
export type { Validator };
