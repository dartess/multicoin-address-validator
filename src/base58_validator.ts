import { base58Decode } from './utils/base58Decode';
import { Address } from './types';

type SolCurrency = typeof import('./currencies/sol').solCurrency;

type Currency = SolCurrency;

// simple base58 validator.  Just checks if it can be decoded.
const Base58Validator = {
    isValidAddress(address: Address, currency: Currency) {
        if (typeof address !== 'string') {
            return false;
        }
        try {
            if (!address) {
                return false;
            }

            if (currency.minLength && (address.length < currency.minLength)) {
                return false;
            }

            if (currency.maxLength && (address.length > currency.maxLength)) {
                return false;
            }
            try {
                const decoded = base58Decode(address);
                return decoded.length > 0;
            } catch (e) {
                // if decoding fails, assume invalid address
                return false;
            }
        } catch (e) {
            return false;
        }
    },
};

type Validator = Parameters<typeof Base58Validator.isValidAddress>;

export { Base58Validator };
export type { Validator };
