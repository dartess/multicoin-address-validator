import { ETHValidator, Validator } from '../ethereum_validator';

const swtCurrency = {
    name: 'Swarm City',
    symbol: 'swt',
} as const;

const swtValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    swtCurrency,
    swtValidate,
};
