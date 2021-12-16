import { Buffer } from 'buffer';

import { segwit } from '../crypto/segwit_addr';
import { toHex } from '../utils/toHex';
import { sha256Checksum } from '../utils/sha256Checksum';
import { blake256Checksum } from '../utils/blake256Checksum';
import { blake2b256 } from '../utils/blake2b256';
import { keccak256Checksum } from '../utils/keccak256Checksum';
import { base58Decode } from '../utils/base58Decode';
import { ExtractNetworkType, OptsNetworkTypeOptional } from '../types';

type BtcCurrency = typeof import('../currencies/btc').btcCurrency;
type LtcCurrency = typeof import('../currencies/ltc').ltcCurrency;
type PpcCurrency = typeof import('../currencies/ppc').ppcCurrency;
type DogeCurrency = typeof import('../currencies/doge').dogeCurrency;
type BvcCurrency = typeof import('../currencies/bvc').bvcCurrency;
type FrcCurrency = typeof import('../currencies/frc').frcCurrency;
type PtsCurrency = typeof import('../currencies/pts').ptsCurrency;
type MecCurrency = typeof import('../currencies/mec').mecCurrency;
type XpmCurrency = typeof import('../currencies/xpm').xpmCurrency;
type AurCurrency = typeof import('../currencies/aur').aurCurrency;
type NmcCurrency = typeof import('../currencies/nmc').nmcCurrency;
type BioCurrency = typeof import('../currencies/bio').bioCurrency;
type GrlcCurrency = typeof import('../currencies/grlc').grlcCurrency;
type VtcCurrency = typeof import('../currencies/vtc').vtcCurrency;
type BtgCurrency = typeof import('../currencies/btg').btgCurrency;
type KmdCurrency = typeof import('../currencies/kmd').kmdCurrency;
type BtczCurrency = typeof import('../currencies/btcz').btczCurrency;
type BtcpCurrency = typeof import('../currencies/btcp').btcpCurrency;
type HushCurrency = typeof import('../currencies/hush').hushCurrency;
type SngCurrency = typeof import('../currencies/sng').sngCurrency;
type ZecCurrency = typeof import('../currencies/zec').zecCurrency;
type ZclCurrency = typeof import('../currencies/zcl').zclCurrency;
type ZenCurrency = typeof import('../currencies/zen').zenCurrency;
type VotCurrency = typeof import('../currencies/vot').votCurrency;
type DcrCurrency = typeof import('../currencies/dcr').dcrCurrency;
type PivxCurrency = typeof import('../currencies/pivx').pivxCurrency;
type SlrCurrency = typeof import('../currencies/slr').slrCurrency;
type MonaCurrency = typeof import('../currencies/mona').monaCurrency;
type DgbCurrency = typeof import('../currencies/dgb').dgbCurrency;
type DashCurrency = typeof import('../currencies/dash').dashCurrency;
type NeoCurrency = typeof import('../currencies/neo').neoCurrency;
type GasCurrency = typeof import('../currencies/gas').gasCurrency;
type QtumCurrency = typeof import('../currencies/qtum').qtumCurrency;
type LbcCurrency = typeof import('../currencies/lbc').lbcCurrency;
type WavesCurrency = typeof import('../currencies/waves').wavesCurrency;
type BchCurrency = typeof import('../currencies/bch').bchCurrency;
type BscCurrency = typeof import('../currencies/bsv').bsvCurrency;
type UsdtCurrency = typeof import('../currencies/usdt').usdtCurrency;

type Currency =
    | BtcCurrency
    | LtcCurrency
    | PpcCurrency
    | DogeCurrency
    | BvcCurrency
    | FrcCurrency
    | PtsCurrency
    | MecCurrency
    | XpmCurrency
    | AurCurrency
    | NmcCurrency
    | BioCurrency
    | GrlcCurrency
    | VtcCurrency
    | BtgCurrency
    | KmdCurrency
    | BtczCurrency
    | BtcpCurrency
    | HushCurrency
    | SngCurrency
    | ZecCurrency
    | ZclCurrency
    | ZenCurrency
    | VotCurrency
    | DcrCurrency
    | PivxCurrency
    | SlrCurrency
    | MonaCurrency
    | DgbCurrency
    | DashCurrency
    | NeoCurrency
    | GasCurrency
    | QtumCurrency
    | LbcCurrency
    | WavesCurrency
    | BchCurrency
    | BscCurrency
    | UsdtCurrency;

type CurrencyNetworkType = ExtractNetworkType<Currency>;

type ExtractHashFunction<U> = U extends { hashFunction: unknown } ? U['hashFunction'] : never;
type HashFunction = 'sha256' | ExtractHashFunction<Currency>;

type Opts = OptsNetworkTypeOptional<CurrencyNetworkType>;

const DEFAULT_NETWORK_TYPE = 'prod';

function getDecoded(address: string) {
    try {
        return base58Decode(address);
    } catch (e) {
        // if decoding fails, assume invalid address
        return null;
    }
}

function getChecksum(hashFunction: HashFunction, payload: string) {
    // Each currency may implement different hashing algorithm
    switch (hashFunction) {
        // blake then keccak hash chain
        case 'blake256keccak256': {
            const blake = blake2b256(payload);
            return keccak256Checksum(Buffer.from(blake, 'hex'));
        }
        case 'blake256':
            return blake256Checksum(payload);
        // not used yet. maybe it will be useful later
        // case 'keccak256':
        //     return keccak256Checksum(payload);
        case 'sha256':
        default:
            return sha256Checksum(payload);
    }
}

function getAddressType(address: string, currency: Currency) {
    // should be 25 bytes per btc address spec and 26 decred
    const expectedLength = 'expectedLength' in currency ? currency.expectedLength : 25;
    const hashFunction = 'hashFunction' in currency ? currency.hashFunction : 'sha256';
    const decoded = getDecoded(address);

    if (decoded) {
        const length = decoded.length;

        if (length !== expectedLength) {
            return null;
        }

        if ('regex' in currency) {
            if (!currency.regex.test(address)) {
                return false;
            }
        }

        const checksum = toHex(decoded.slice(length - 4, length));
        const body = toHex(decoded.slice(0, length - 4));
        const goodChecksum = getChecksum(hashFunction, body);

        return checksum === goodChecksum ? toHex(decoded.slice(0, expectedLength - 24)) : null;
    }

    return null;
}

function isValidP2PKHandP2SHAddress(address: string, currency: Currency, opts: Opts) {
    const { networkType = DEFAULT_NETWORK_TYPE } = opts;

    let correctAddressTypes: ReadonlyArray<string>;
    const addressType = getAddressType(address, currency);

    if (addressType) {
        correctAddressTypes = networkType === 'prod' || networkType === 'testnet'
            ? currency.addressTypes[networkType]
            : (currency.addressTypes.prod as ReadonlyArray<string>).concat(currency.addressTypes.testnet);

        return correctAddressTypes.indexOf(addressType) >= 0;
    }

    return false;
}

const BTCValidator = {
    isValidAddress(address: string, currency: Currency, opts: Opts = {}) {
        if (typeof address !== 'string') {
            return false;
        }
        return isValidP2PKHandP2SHAddress(address, currency, opts) || segwit.isValidAddress(address, currency, opts);
    },
};

type Validator = Parameters<typeof BTCValidator.isValidAddress>;

export { BTCValidator };
export type { Validator };
