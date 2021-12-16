import cbor from 'cbor-js';
import { crc32 } from 'crc';

import { BIP173Validator } from './bip173_validator';
import { base58Decode } from '../utils/base58Decode';
import { OptsNetworkTypeOptional } from '../types';

type AdaCurrency = typeof import('../currencies/ada').adaCurrency;

type Currency = AdaCurrency;
type CurrencyNetworkType = keyof AdaCurrency['bech32Hrp'];

function getDecoded(address: string) {
    try {
        const decoded = base58Decode(address);
        return cbor.decode(new Uint8Array(decoded).buffer);
    } catch (e) {
        // if decoding fails, assume invalid address
        return null;
    }
}

function isValidAddressV1(address: string) {
    const decoded = getDecoded(address);

    if (!decoded || (!Array.isArray(decoded) || decoded.length !== 2)) {
        return false;
    }

    const [tagged, validCrc] = decoded;
    if (typeof (validCrc) !== 'number') {
        return false;
    }

    // get crc of the payload
    const crc = crc32(tagged as Buffer); // todo check CRC types

    return crc === validCrc;
}

function isValidAddressShelley(
    address: string,
    currency: Currency,
    opts: OptsNetworkTypeOptional<CurrencyNetworkType>,
) {
    // shelley address are just bip 173 - bech32 addresses (https://cips.cardano.org/cips/cip4/)
    return BIP173Validator.isValidAddress(address, currency, opts);
}

const ADAValidator = {
    isValidAddress(address: string, currency: Currency, opts: OptsNetworkTypeOptional<CurrencyNetworkType> = {}) {
        return isValidAddressV1(address) || isValidAddressShelley(address, currency, opts);
    },
};

type ValidatorParams = Parameters<typeof ADAValidator.isValidAddress>;

export { ADAValidator };
export type { ValidatorParams };
