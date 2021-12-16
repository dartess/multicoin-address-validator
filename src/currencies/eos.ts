import { EOSValidator, Validator } from '../validators/eos_validator';

const eosCurrency = {
    name: 'EOS',
    symbol: 'eos',
} as const;

const eosValidate = (address: Validator[0]) => EOSValidator.isValidAddress(address);

export {
    eosCurrency,
    eosValidate,
};
