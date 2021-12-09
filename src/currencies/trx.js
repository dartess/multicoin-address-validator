const TRXValidator = require("../tron_validator");

const trx = {
    name: 'Tron',
    symbol: 'trx',
    addressTypes: {prod: [0x41], testnet: [0xa0]},
    validate: (address, opts) => TRXValidator.isValidAddress(address, trx, opts),
}

const trxValidate = trx.validate;

module.exports = {
    trx,
    trxValidate,
}
