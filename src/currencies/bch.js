const BCHValidator = require('../bch_validator');

const bch = {
    name: 'BitcoinCash',
    symbol: 'bch',
    regexp: '^[qQpP]{1}[0-9a-zA-Z]{41}$',
    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']},
    validate: (address, opts) => BCHValidator.isValidAddress(address, bch, opts),
}

const bchValidate = bch.validate;

module.exports = {
    bch,
    bchValidate,
}
