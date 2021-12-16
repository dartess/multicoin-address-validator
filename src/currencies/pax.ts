import { ETHValidator, Validator } from '../ethereum_validator';

const paxCurrency = {
    name: 'Paxos',
    symbol: 'pax',
} as const;

const paxValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    paxCurrency,
    paxValidate,
};
