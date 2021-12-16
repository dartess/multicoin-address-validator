import { ETHValidator } from '../validators/ethereum_validator';

const glmCurrency = {
    name: 'Golem',
    symbol: 'glm',
} as const;

const glmValidate = ETHValidator.isValidAddress;

export {
    glmCurrency,
    glmValidate,
};
