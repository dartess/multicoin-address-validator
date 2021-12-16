import { ETHValidator, Validator } from '../validators/ethereum_validator';

const btuCurrency = {
    name: 'BTU Protocol',
    symbol: 'btu',
} as const;

const btuValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    btuCurrency,
    btuValidate,
};
