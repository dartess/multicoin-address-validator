import { TRXValidator, Validator } from '../tron_validator';

const trxCurrency = {
    name: 'Tron',
    symbol: 'trx',
    addressTypes: { prod: [0x41], testnet: [0xa0] },
} as const;

const trxValidate = (
    address: Validator[0],
    opts: Validator[2],
) => TRXValidator.isValidAddress(address, trxCurrency, opts);

export {
    trxCurrency,
    trxValidate,
};
