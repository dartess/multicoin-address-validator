import { ETHValidator, Validator } from '../ethereum_validator';

const glmCurrency = {
    name: 'Golem',
    symbol: 'glm',
} as const;

const glmValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    glmCurrency,
    glmValidate,
};
