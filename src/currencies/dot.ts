import { DotValidator, Validator } from '../validators/dot_validator';

const dotCurrency = {
    name: 'Polkadot',
    symbol: 'dot',
} as const;

const dotValidate = (
    address: Validator[0],
) => DotValidator.isValidAddress(address);

export {
    dotCurrency,
    dotValidate,
};
