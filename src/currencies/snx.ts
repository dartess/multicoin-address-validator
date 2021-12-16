import { ETHValidator } from '../validators/ethereum_validator';

const snxCurrency = {
    name: 'Synthetix Network',
    symbol: 'snx',
} as const;

const snxValidate = ETHValidator.isValidAddress;

export {
    snxCurrency,
    snxValidate,
};
