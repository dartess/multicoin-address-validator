import { ETHValidator, Validator } from '../ethereum_validator';

const rcnCurrency = {
    name: 'Ripio Credit Network',
    symbol: 'rcn',
} as const;

const rcnValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    rcnCurrency,
    rcnValidate,
};
