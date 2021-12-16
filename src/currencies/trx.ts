import { TRXValidator, ValidatorParams } from '../validators/tron_validator';

const trxCurrency = {
    name: 'Tron',
    symbol: 'trx',
    addressTypes: { prod: [0x41], testnet: [0xa0] },
} as const;

const trxValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => TRXValidator.isValidAddress(address, trxCurrency, opts);

export {
    trxCurrency,
    trxValidate,
};
