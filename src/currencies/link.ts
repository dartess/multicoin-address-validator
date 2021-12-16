import { ETHValidator, Validator } from '../ethereum_validator';

const linkCurrency = {
    name: 'Chainlink',
    symbol: 'link',
} as const;

const linkValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    linkCurrency,
    linkValidate,
};
