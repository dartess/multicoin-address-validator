import { ETHValidator, Validator } from '../validators/ethereum_validator';

const snxCurrency = {
    name: 'Synthetix Network',
    symbol: 'snx',
} as const;

const snxValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    snxCurrency,
    snxValidate,
};
