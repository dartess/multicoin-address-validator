import { USDTValidator, Validator } from '../usdt_validator';

const usdtCurrency = {
    name: 'Tether',
    symbol: 'usdt',
    addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
} as const;

const usdtValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => USDTValidator.isValidAddress(address, usdtCurrency, opts);

export {
    usdtCurrency,
    usdtValidate,
};
