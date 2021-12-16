import { ETHValidator, Validator } from '../validators/ethereum_validator';

const zrxCurrency = {
    name: '0x',
    symbol: 'zrx',
} as const;

const zrxValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    zrxCurrency,
    zrxValidate,
};
