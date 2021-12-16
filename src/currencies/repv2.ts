import { ETHValidator, Validator } from '../validators/ethereum_validator';

const repv2Currency = {
    name: 'AugurV2',
    symbol: 'repv2',
} as const;

const repv2Validate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    repv2Currency,
    repv2Validate,
};
