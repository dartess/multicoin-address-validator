import { cnBase58Decode } from '../crypto/cnBase58';

import { keccak256Checksum } from '../utils/keccak256Checksum';
import { Address, ExtractNetworkType, OptsNetworkTypeOptional } from '../types';

type XmrCurrency = typeof import('../currencies/xmr').xmrCurrency;
type LokiCurrency = typeof import('../currencies/loki').lokiCurrency;

type Currency = XmrCurrency | LokiCurrency;
type CurrencyNetworkType = ExtractNetworkType<Currency> | 'both';

const DEFAULT_NETWORK_TYPE = 'prod';
const addressRegTest = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{95}$/;
const integratedAddressRegTest = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{106}$/;

function validateNetwork(decoded: string, currency: Currency, networkType: CurrencyNetworkType, addressType: string) {
    let network: Record<string, ReadonlyArray<string>> = currency.addressTypes;
    if (addressType === 'integrated') {
        network = currency.iAddressTypes;
    }
    const at = parseInt(decoded.slice(0, 2), 16).toString();

    switch (networkType) {
        case 'prod':
            return network.prod.indexOf(at) >= 0;
        case 'testnet':
            return network.testnet.indexOf(at) >= 0;
        case 'stagenet':
            return network.stagenet.indexOf(at) >= 0;
        case 'both':
            return network.prod.indexOf(at) >= 0
                || network.testnet.indexOf(at) >= 0
                || network.stagenet.indexOf(at) >= 0;
        default:
            return false;
    }
}

function hextobin(hex: string) {
    const res = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length / 2; ++i) {
        res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return res;
}

const XMRValidator = {
    isValidAddress(address: Address, currency: Currency, opts: OptsNetworkTypeOptional<CurrencyNetworkType> = {}) {
        const { networkType = DEFAULT_NETWORK_TYPE } = opts;
        let addressType = 'standard';
        if (!addressRegTest.test(address)) {
            if (integratedAddressRegTest.test(address)) {
                addressType = 'integrated';
            } else {
                return false;
            }
        }

        const decodedAddrStr = cnBase58Decode(address);
        if (!decodedAddrStr) return false;

        if (!validateNetwork(decodedAddrStr, currency, networkType, addressType)) return false;

        const addrChecksum = decodedAddrStr.slice(-8);
        const hashChecksum = keccak256Checksum(hextobin(decodedAddrStr.slice(0, -8)));

        return addrChecksum === hashChecksum;
    },
};

type Validator = Parameters<typeof XMRValidator.isValidAddress>;

export { XMRValidator };
export type { Validator };
