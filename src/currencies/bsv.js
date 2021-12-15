const BCHValidator = require('../bch_validator');

const bsvCurrency = {
    name: 'Bitcoin SV',
    symbol: 'bsv',
    regexp: '^[qQ]{1}[0-9a-zA-Z]{41}$',
    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']},
}

const bsvValidate = (address, opts) => BCHValidator.isValidAddress(address, bsvCurrency, opts);

module.exports = {
    bsvCurrency,
    bsvValidate,
}
