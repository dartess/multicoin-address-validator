const BCHValidator = require('../bch_validator');

const bchCurrency = {
    name: 'BitcoinCash',
    symbol: 'bch',
    regexp: '^[qQpP]{1}[0-9a-zA-Z]{41}$',
    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']},
}

const bchValidate = (address, opts) => BCHValidator.isValidAddress(address, bchCurrency, opts);

module.exports = {
    bchCurrency,
    bchValidate,
}
