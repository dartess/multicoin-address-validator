var currencies = require('./currencies');

var DEFAULT_CURRENCY_NAME = 'bitcoin';

module.exports = {
    validate: function (address, currencyNameOrSymbol, networkTypeOrOpts) {
        var currency = currencies.getByNameOrSymbol(currencyNameOrSymbol || DEFAULT_CURRENCY_NAME);

        if (currency) {
            const opts = typeof networkTypeOrOpts === 'string'
                ? { networkType: networkTypeOrOpts }
                : networkTypeOrOpts;
            return currency.validate
                ? currency.validate(address, opts)
                : currency.validator.isValidAddress(address, currency, opts);
        }

        throw new Error('Missing validator for currency: ' + currencyNameOrSymbol);
    },
    getCurrencies: function () {
        return currencies.getAll();
    },
    findCurrency: function(symbol) {
        return currencies.getByNameOrSymbol(symbol) || null ;
    }
};
