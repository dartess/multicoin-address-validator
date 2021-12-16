import { ETHValidator, Validator } from '../ethereum_validator';

const manaCurrency = {
    name: 'Decentraland',
    symbol: 'mana',
} as const;

const manaValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    manaCurrency,
    manaValidate,
};
