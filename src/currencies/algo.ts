import { AlgoValidator } from '../validators/algo_validator';

const algoCurrency = {
    name: 'Algorand',
    symbol: 'algo',
} as const;

const algoValidate = AlgoValidator.isValidAddress;

export {
    algoCurrency,
    algoValidate,
};
