import { ETHValidator } from '../validators/ethereum_validator';

const swtCurrency = {
    name: 'Swarm City',
    symbol: 'swt',
} as const;

const swtValidate = ETHValidator.isValidAddress;

export {
    swtCurrency,
    swtValidate,
};
