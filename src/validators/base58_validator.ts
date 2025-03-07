import { base58Decode } from '../utils/base58Decode';

type SolCurrency = typeof import('../currencies/sol').solCurrency;

type Currency = SolCurrency;

// simple base58 validator.  Just checks if it can be decoded.
const Base58Validator = {
    isValidAddress(address: string, currency: Currency) {
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
    },
};

type ValidatorParams = Parameters<typeof Base58Validator.isValidAddress>;

export { Base58Validator };
export type { ValidatorParams };
