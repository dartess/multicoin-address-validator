import { ETHValidator } from '../validators/ethereum_validator';

const zrxCurrency = {
    name: '0x',
    symbol: 'zrx',
} as const;

const zrxValidate = ETHValidator.isValidAddress;

export {
    zrxCurrency,
    zrxValidate,
};
