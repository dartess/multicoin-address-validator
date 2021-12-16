import { ETHValidator, Validator } from '../validators/ethereum_validator';

const nmrCurrency = {
    name: 'Numeraire',
    symbol: 'nmr',
} as const;

const nmrValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    nmrCurrency,
    nmrValidate,
};
