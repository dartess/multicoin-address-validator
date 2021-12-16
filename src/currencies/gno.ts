import { ETHValidator, Validator } from '../validators/ethereum_validator';

const gnoCurrency = {
    name: 'Gnosis',
    symbol: 'gno',
} as const;

const gnoValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    gnoCurrency,
    gnoValidate,
};
