import { ETHValidator, Validator } from '../validators/ethereum_validator';

const temcoCurrency = {
    name: 'TEMCO',
    symbol: 'temco',
} as const;

const temcoValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    temcoCurrency,
    temcoValidate,
};
