import { ETHValidator } from '../validators/ethereum_validator';

const gameCurrency = {
    name: 'GameCredits',
    symbol: 'game',
    addressTypes: { prod: ['26', '05'], testnet: [] },
} as const;

const gameValidate = ETHValidator.isValidAddress;

export {
    gameCurrency,
    gameValidate,
};
