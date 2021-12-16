import { ETHValidator } from '../validators/ethereum_validator';

const manaCurrency = {
    name: 'Decentraland',
    symbol: 'mana',
} as const;

const manaValidate = ETHValidator.isValidAddress;

export {
    manaCurrency,
    manaValidate,
};
