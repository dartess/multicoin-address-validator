import { ETHValidator } from '../validators/ethereum_validator';

const repv2Currency = {
    name: 'AugurV2',
    symbol: 'repv2',
} as const;

const repv2Validate = ETHValidator.isValidAddress;

export {
    repv2Currency,
    repv2Validate,
};
