import { bech32 } from './crypto/bech32';
import { Address, OptsNetworkTypeOptional } from './types';

type CroCurrency = typeof import('./currencies/cro').croCurrency;

type Currency = CroCurrency;
type CurrencyAddressType = keyof CroCurrency['bech32Hrp'];

// bip 173 bech 32 addresses (https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)
const BIP173Validator = {
    isValidAddress(address: Address, currency: Currency, opts: OptsNetworkTypeOptional<CurrencyAddressType> = {}) {
        if (typeof address !== 'string') {
            return false;
        }
        const { networkType = 'prod' } = opts;
        const decoded = bech32.decode(address, bech32.encodings.BECH32);
        if (!decoded) {
            return false;
        }

        const bech32Hrp = decoded.hrp;
        const correctBech32Hrps: ReadonlyArray<string> = networkType === 'prod' || networkType === 'testnet'
            ? currency.bech32Hrp[networkType]
            : (currency.bech32Hrp.prod as ReadonlyArray<string>).concat(currency.bech32Hrp.testnet);

        return correctBech32Hrps.indexOf(bech32Hrp) !== -1;
    },
};

type Validator = Parameters<typeof BIP173Validator.isValidAddress>;

export { BIP173Validator };
export type { Validator };
