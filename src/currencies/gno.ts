import { ETHValidator } from '../validators/ethereum_validator';

const gnoCurrency = {
    name: 'Gnosis',
    symbol: 'gno',
} as const;

const gnoValidate = ETHValidator.isValidAddress;

export {
    gnoCurrency,
    gnoValidate,
};
