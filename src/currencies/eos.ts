import { EOSValidator } from '../validators/eos_validator';

const eosCurrency = {
    name: 'EOS',
    symbol: 'eos',
} as const;

const eosValidate = EOSValidator.isValidAddress;

export {
    eosCurrency,
    eosValidate,
};
