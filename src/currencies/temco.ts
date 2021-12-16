import { ETHValidator } from '../validators/ethereum_validator';

const temcoCurrency = {
    name: 'TEMCO',
    symbol: 'temco',
} as const;

const temcoValidate = ETHValidator.isValidAddress;

export {
    temcoCurrency,
    temcoValidate,
};
