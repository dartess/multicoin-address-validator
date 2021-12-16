import { ETHValidator } from '../validators/ethereum_validator';

const linkCurrency = {
    name: 'Chainlink',
    symbol: 'link',
} as const;

const linkValidate = ETHValidator.isValidAddress;

export {
    linkCurrency,
    linkValidate,
};
