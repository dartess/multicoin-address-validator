import { ETHValidator, Validator } from '../validators/ethereum_validator';

const gameCurrency = {
    name: 'GameCredits',
    symbol: 'game',
    addressTypes: { prod: ['26', '05'], testnet: [] },
} as const;

const gameValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    gameCurrency,
    gameValidate,
};
