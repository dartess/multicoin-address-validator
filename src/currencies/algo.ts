import { AlgoValidator, Validator } from '../algo_validator';

const algoCurrency = {
    name: 'Algorand',
    symbol: 'algo',
} as const;

const algoValidate = (address: Validator[0]) => AlgoValidator.isValidAddress(address);

export {
    algoCurrency,
    algoValidate,
};
