import { ETHValidator, Validator } from '../validators/ethereum_validator';

const wingsCurrency = {
    name: 'Wings',
    symbol: 'wings',
} as const;

const wingsValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    wingsCurrency,
    wingsValidate,
};
