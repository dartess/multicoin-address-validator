import { ETHValidator } from '../validators/ethereum_validator';

const nmrCurrency = {
    name: 'Numeraire',
    symbol: 'nmr',
} as const;

const nmrValidate = ETHValidator.isValidAddress;

export {
    nmrCurrency,
    nmrValidate,
};
