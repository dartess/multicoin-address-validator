import { ETHValidator } from '../validators/ethereum_validator';

const paxCurrency = {
    name: 'Paxos',
    symbol: 'pax',
} as const;

const paxValidate = ETHValidator.isValidAddress;

export {
    paxCurrency,
    paxValidate,
};
