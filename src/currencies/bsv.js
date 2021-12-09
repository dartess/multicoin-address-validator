const BCHValidator = require('../bch_validator');

const bsv = {
    name: 'Bitcoin SV',
    symbol: 'bsv',
    regexp: '^[qQ]{1}[0-9a-zA-Z]{41}$',
    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']},
    validate: (address, opts) => BCHValidator.isValidAddress(address, bsv, opts),
}

const bsvValidate = bsv.validate;

module.exports = {
    bsv,
    bsvValidate,
}
