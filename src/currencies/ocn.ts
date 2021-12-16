import { ETHValidator, Validator } from '../validators/ethereum_validator';

const ocnCurrency = {
    name: 'Odyssey',
    symbol: 'ocn',
} as const;

const ocnValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    ocnCurrency,
    ocnValidate,
};
