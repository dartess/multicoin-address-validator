import { ETHValidator } from '../validators/ethereum_validator';

const rcnCurrency = {
    name: 'Ripio Credit Network',
    symbol: 'rcn',
} as const;

const rcnValidate = ETHValidator.isValidAddress;

export {
    rcnCurrency,
    rcnValidate,
};
