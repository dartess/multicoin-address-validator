import { ExtractNetworkType, OptsNetworkTypeOptional } from '../types';
import { sha256 } from '../utils/sha256';
import { base58Decode } from '../utils/base58Decode';
import { byteArray2hexStr } from '../utils/byteArray2hexStr';
import { hexStr2byteArray } from '../utils/hexStr2byteArray';

type TrxCurrency = typeof import('../currencies/trx').trxCurrency;

type Currency = TrxCurrency;
type CurrencyNetworkType = ExtractNetworkType<Currency>;

function decodeBase58Address(base58Sting: string) {
    if (base58Sting.length <= 4) {
        return false;
    }

    let address: Buffer;
    try {
        address = base58Decode(base58Sting);
    } catch (e) {
        return false;
    }

    const len = address.length;
    const offset = len - 4;
    const checkSum = address.slice(offset);
    address = address.slice(0, offset);
    const hash0 = sha256(byteArray2hexStr(address));
    const hash1 = hexStr2byteArray(sha256(hash0));
    const checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] === checkSum1[0] && checkSum[1] === checkSum1[1] && checkSum[2]
        === checkSum1[2] && checkSum[3] === checkSum1[3]
    ) {
        return address;
    }

    return false;
}

function getEnv(currency: Currency, networkType: CurrencyNetworkType | '') {
    let evn = networkType || 'prod';

    if (evn !== 'prod' && evn !== 'testnet') evn = 'prod';

    return currency.addressTypes[evn][0];
}

const TRXValidator = {
    /**
     * tron address validation
     */
    isValidAddress(
        mainAddress: string,
        currency: Currency,
        opts?: OptsNetworkTypeOptional<CurrencyNetworkType>,
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

type ValidatorParams = Parameters<typeof TRXValidator.isValidAddress>;

export { TRXValidator };
export type { ValidatorParams };
