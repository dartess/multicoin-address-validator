import { Address, OptsNetworkTypeOptional } from './types';

type Currency = typeof import('./currencies/trx').trxCurrency;
type CurrencyAddressType = keyof Currency['addressTypes'];

const cryptoUtils = require('./crypto/utils');

function decodeBase58Address(base58Sting: string) {
    if (typeof (base58Sting) !== 'string') {
        return false;
    }
    if (base58Sting.length <= 4) {
        return false;
    }

    let address: Array<number>;
    try {
        address = cryptoUtils.base58(base58Sting);
    } catch (e) {
        return false;
    }

    const len = address.length;
    const offset = len - 4;
    const checkSum = address.slice(offset);
    address = address.slice(0, offset);
    const hash0 = cryptoUtils.sha256(cryptoUtils.byteArray2hexStr(address));
    const hash1 = cryptoUtils.hexStr2byteArray(cryptoUtils.sha256(hash0));
    const checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] === checkSum1[0] && checkSum[1] === checkSum1[1] && checkSum[2]
        === checkSum1[2] && checkSum[3] === checkSum1[3]
    ) {
        return address;
    }

    return false;
}

function getEnv(currency: Currency, networkType: CurrencyAddressType | '') {
    let evn = networkType || 'prod';

    if (evn !== 'prod' && evn !== 'testnet') evn = 'prod';

    return currency.addressTypes[evn][0];
}

const TRXValidator = {
    /**
     * tron address validation
     */
    isValidAddress(
        mainAddress: Address,
        currency: Currency,
        opts?: OptsNetworkTypeOptional<CurrencyAddressType>,
    ) {
        const networkType = opts?.networkType ?? '';
        const address = decodeBase58Address(mainAddress);

        if (!address) {
            return false;
        }

        if (address.length !== 21) {
            return false;
        }

        return getEnv(currency, networkType) === address[0];
    },
};

export { TRXValidator };
