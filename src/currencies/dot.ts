import { DotValidator } from '../validators/dot_validator';

const dotCurrency = {
    name: 'Polkadot',
    symbol: 'dot',
} as const;

const dotValidate = DotValidator.isValidAddress;

export {
    dotCurrency,
    dotValidate,
};
