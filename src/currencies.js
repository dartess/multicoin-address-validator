var BTCValidator = require('./bitcoin_validator');
const {antCurrency, antValidate} = require("./currencies/ant");
const {batCurrency, batValidate} = require("./currencies/bat");
const {bntCurrency, bntValidate} = require("./currencies/bnt");
const {cvcCurrency, cvcValidate} = require("./currencies/cvc");
const {dntCurrency, dntValidate} = require("./currencies/dnt");
const {gnoCurrency, gnoValidate} = require("./currencies/gno");
const {gntCurrency, gntValidate} = require("./currencies/gnt");
const {glmCurrency, glmValidate} = require("./currencies/glm");
const {gupCurrency, gupValidate} = require("./currencies/gup");
const {mlnCurrency, mlnValidate} = require("./currencies/mln");
const {nmrCurrency, nmrValidate} = require("./currencies/nmr");
const {omgCurrency, omgValidate} = require("./currencies/omg");
const {payCurrency, payValidate} = require("./currencies/pay");
const {rcnCurrency, rcnValidate} = require("./currencies/rcn");
const {repCurrency, repValidate} = require("./currencies/rep");
const {rlcCurrency, rlcValidate} = require("./currencies/rlc");
const {saltCurrency, saltValidate} = require("./currencies/salt");
const {sntCurrency, sntValidate} = require("./currencies/snt");
const {storjCurrency, storjValidate} = require("./currencies/storj");
const {swtCurrency, swtValidate} = require("./currencies/swt");
const {tusdCurrency, tusdValidate} = require("./currencies/tusd");
const {wingsCurrency, wingsValidate} = require("./currencies/wings");
const {zrxCurrency, zrxValidate} = require("./currencies/zrx");
const {expCurrency, expValidate} = require("./currencies/exp");
const {vibCurrency, vibValidate} = require("./currencies/vib");
const {ocnCurrency, ocnValidate} = require("./currencies/ocn");
const {polyCurrency, polyValidate} = require("./currencies/poly");
const {stormCurrency, stormValidate} = require("./currencies/storm");
const {btuCurrency, btuValidate} = require("./currencies/btu");
const {daiCurrency, daiValidate} = require("./currencies/dai");
const {enjCurrency, enjValidate} = require("./currencies/enj");
const {hedgCurrency, hedgValidate} = require("./currencies/hedg");
const {lbaCurrency, lbaValidate} = require("./currencies/lba");
const {linkCurrency, linkValidate} = require("./currencies/link");
const {loomCurrency, loomValidate} = require("./currencies/loom");
const {mkrCurrency, mkrValidate} = require("./currencies/mkr");
const {mtlCurrency, mtlValidate} = require("./currencies/mtl");
const {oceanCurrency, oceanValidate} = require("./currencies/ocean");
const {qntCurrency, qntValidate} = require("./currencies/qnt");
const {snxCurrency, snxValidate} = require("./currencies/snx");
const {solveCurrency, solveValidate} = require("./currencies/solve");
const {spndCurrency, spndValidate} = require("./currencies/spnd");
const {temcoCurrency, temcoValidate} = require("./currencies/temco");
const {vetCurrency, vetValidate} = require("./currencies/vet");
const {stmxCurrency, stmxValidate} = require("./currencies/stmx");
const {repv2Currency, repv2Validate} = require("./currencies/repv2");
const {fctCurrency, fctValidate} = require("./currencies/fct");
const {bttCurrency, bttValidate} = require("./currencies/btt");
const {qrlCurrency, qrlValidate} = require("./currencies/qrl");
const {servCurrency, servValidate} = require("./currencies/serv");
const {xtpCurrency, xtpValidate} = require("./currencies/xtp");
const {compCurrency, compValidate} = require("./currencies/comp");
const {paxCurrency, paxValidate} = require("./currencies/pax");
const {usdcCurrency, usdcValidate} = require("./currencies/usdc");
const {cusdCurrency, cusdValidate} = require("./currencies/cusd");
const {uniCurrency, uniValidate} = require("./currencies/uni");
const {aaveCurrency, aaveValidate} = require("./currencies/aave");
const {maticCurrency, maticValidate} = require("./currencies/matic");
const {manaCurrency, manaValidate} = require("./currencies/mana");
const {gameCurrency, gameValidate} = require("./currencies/game");
const {ethCurrency, ethValidate} = require("./currencies/eth");
const {etzCurrency, etzValidate} = require("./currencies/etz");
const {etcCurrency, etcValidate} = require("./currencies/etc");
const {cloCurrency, cloValidate} = require("./currencies/clo");
const {bkxCurrency, bkxValidate} = require("./currencies/bkx");
const {adaCurrency, adaValidate} = require("./currencies/ada");
const {xmrCurrency, xmrValidate} = require("./currencies/xmr");
const {lokiCurrency, lokiValidate} = require("./currencies/loki");
const {nanoCurrency, nanoValidate} = require("./currencies/nano");
const {xrbCurrency, xrbValidate} = require("./currencies/xrb");
const {scCurrency, scValidate} = require("./currencies/sc");
const {xscCurrency, xscValidate} = require("./currencies/xsc");
const {xemCurrency, xemValidate} = require("./currencies/xem");
const {lskCurrency, lskValidate} = require("./currencies/lsk");
const {xlmCurrency, xlmValidate} = require("./currencies/xlm");
const {eosCurrency, eosValidate} = require("./currencies/eos");
const {xtzCurrency, xtzValidate} = require("./currencies/xtz");
const {usdtCurrency, usdtValidate} = require("./currencies/usdt");
const {algoCurrency, algoValidate} = require("./currencies/algo");
const {dotCurrency, dotValidate} = require("./currencies/dot");
const {croCurrency, croValidate} = require("./currencies/cro");
const {solCurrency, solValidate} = require("./currencies/sol");
const {bchCurrency, bchValidate} = require("./currencies/bch");
const {bsvCurrency, bsvValidate} = require("./currencies/bsv");
const {trxCurrency, trxValidate} = require("./currencies/trx");
const {xrpCurrency, xrpValidate} = require("./currencies/xrp");

// defines P2PKH and P2SH address types for standard (prod) and testnet networks
var CURRENCIES = [
    {
        name: 'Bitcoin',
        symbol: 'btc',
        addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4', '3c', '26']},
        bech32Hrp: {prod: ['bc'], testnet: ['tb']},
        validator: BTCValidator
    },
    {
        ...bchCurrency,
        validate: bchValidate,
    },
    {
        ...bsvCurrency,
        validate: bsvValidate,
    },
    {
        name: 'LiteCoin',
        symbol: 'ltc',
        addressTypes: {prod: ['30', '05', '32'], testnet: ['6f', 'c4', '3a']},
        bech32Hrp: {prod: ['ltc'], testnet: ['tltc']},
        validator: BTCValidator
    },
    {
        name: 'PeerCoin',
        symbol: 'ppc',
        addressTypes: {prod: ['37', '75'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'DogeCoin',
        symbol: 'doge',
        addressTypes: {prod: ['1e', '16'], testnet: ['71', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'BeaverCoin',
        symbol: 'bvc',
        addressTypes: {prod: ['19', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator,
    },
    {
        name: 'FreiCoin',
        symbol: 'frc',
        addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'ProtoShares',
        symbol: 'pts',
        addressTypes: {prod: ['38', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'MegaCoin',
        symbol: 'mec',
        addressTypes: {prod: ['32', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'PrimeCoin',
        symbol: 'xpm',
        addressTypes: {prod: ['17', '53'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'AuroraCoin',
        symbol: 'aur',
        addressTypes: {prod: ['17', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'NameCoin',
        symbol: 'nmc',
        addressTypes: {prod: ['34'], testnet: []},
        validator: BTCValidator
    },
    {
        name: 'BioCoin',
        symbol: 'bio',
        addressTypes: {prod: ['19', '14'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'GarliCoin',
        symbol: 'grlc',
        addressTypes: {prod: ['26', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'VertCoin',
        symbol: 'vtc',
        addressTypes: {prod: ['0x', '47', '71', '05'], testnet: ['6f', 'c4']},
        validator: BTCValidator

    },
    {
        name: 'BitcoinGold',
        symbol: 'btg',
        addressTypes: {prod: ['26', '17'], testnet: ['6f', 'c4']},
        validator: BTCValidator
    },
    {
        name: 'Komodo',
        symbol: 'kmd',
        addressTypes: {prod: ['3c', '55'], testnet: ['0', '5']},
        validator: BTCValidator
    },
    {
        name: 'BitcoinZ',
        symbol: 'btcz',
        expectedLength: 26,
        addressTypes: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
        validator: BTCValidator
    },
    {
        name: 'BitcoinPrivate',
        symbol: 'btcp',
        expectedLength: 26,
        addressTypes: {prod: ['1325', '13af'], testnet: ['1957', '19e0']},
        validator: BTCValidator
    },
    {
        name: 'Hush',
        symbol: 'hush',
        expectedLength: 26,
        addressTypes: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
        validator: BTCValidator
    },
    {
        name: 'SnowGem',
        symbol: 'sng',
        expectedLength: 26,
        addressTypes: {prod: ['1c28', '1c2d'], testnet: ['1d25', '1cba']},
        validator: BTCValidator
    },
    {
        name: 'ZCash',
        symbol: 'zec',
        expectedLength: 26,
        addressTypes: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
        validator: BTCValidator
    },
    {
        name: 'ZClassic',
        symbol: 'zcl',
        expectedLength: 26,
        addressTypes: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
        validator: BTCValidator
    },
    {
        name: 'ZenCash',
        symbol: 'zen',
        expectedLength: 26,
        addressTypes: {prod: ['2089', '2096'], testnet: ['2092', '2098']},
        validator: BTCValidator
    },
    {
        name: 'VoteCoin',
        symbol: 'vot',
        expectedLength: 26,
        addressTypes: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
        validator: BTCValidator
    },
    {
        name: 'Decred',
        symbol: 'dcr',
        addressTypes: {prod: ['073f', '071a'], testnet: ['0f21', '0efc']},
        hashFunction: 'blake256',
        expectedLength: 26,
        validator: BTCValidator
    },
    {
        ...gameCurrency,
        validate: gameValidate,
    },
    {
        name: 'PIVX',
        symbol: 'pivx',
        addressTypes: {prod: ['1e', '0d'], testnet: []},
        validator: BTCValidator
    },
    {
        name: 'SolarCoin',
        symbol: 'slr',
        addressTypes: {prod: ['12', '05'], testnet: []},
        validator: BTCValidator
    },
    {
        name: 'MonaCoin',
        symbol: 'mona',
        addressTypes: {prod: ['32', '37'], testnet: []},
        validator: BTCValidator
    },
    {
        name: 'DigiByte',
        symbol: 'dgb',
        addressTypes: {prod: ['1e', '3f'], testnet: []},
        bech32Hrp: {prod: ['dgb', 'S'], testnet: []},
        validator: BTCValidator
    },
    {
        ...usdtCurrency,
        validate: usdtValidate,
    },
    {
        ...xrpCurrency,
        validate: xrpValidate,
    },
    {
        name: 'Dash',
        symbol: 'dash',
        addressTypes: {prod: ['4c', '10'], testnet: ['8c', '13']},
        validator: BTCValidator
    },
    {
        name: 'Neo',
        symbol: 'neo',
        addressTypes: {prod: ['17'], testnet: []},
        validator: BTCValidator
    },
    {
        name: 'NeoGas',
        symbol: 'gas',
        addressTypes: {prod: ['17'], testnet: []},
        validator: BTCValidator
    },
    {
        name: 'Qtum',
        symbol: 'qtum',
        addressTypes: {prod: ['3a', '32'], testnet: ['78', '6e']},
        validator: BTCValidator
    },
    {
        name: 'Waves',
        symbol: 'waves',
        addressTypes: {prod: ['0157'], testnet: ['0154']},
        expectedLength: 26,
        hashFunction: 'blake256keccak256',
        regex: /^[a-zA-Z0-9]{35}$/,
        validator: BTCValidator
    },
    {
        ...ethCurrency,
        validate: ethValidate,
    },
    {
        ...etzCurrency,
        validate: etzValidate,
    },
    {
        ...etcCurrency,
        validate: etcValidate,
    },
    {
        ...cloCurrency,
        validate: cloValidate,
    },
    {
        ...bkxCurrency,
        validate: bkxValidate,
    },
    {
        ...adaCurrency,
        validate: adaValidate,
    },
    {
        ...xmrCurrency,
        validate: xmrValidate,
    },
    {
        ...antCurrency,
        validate: antValidate,
    },
    {
        ...batCurrency,
        validate: batValidate,
    },
    {
        ...bntCurrency,
        validate: bntValidate,
    },
    {
        ...cvcCurrency,
        validate: cvcValidate,
    },
    {
        ...dntCurrency,
        validate: dntValidate,
    },
    {
        ...gnoCurrency,
        validate: gnoValidate,
    },
    {
        ...gntCurrency,
        validate: gntValidate,
    },
    {
        ...glmCurrency,
        validate: glmValidate,
    },
    {
        ...gupCurrency,
        validate: gupValidate,
    },
    {
        ...mlnCurrency,
        validate: mlnValidate,
    },
    {
        ...nmrCurrency,
        validate: nmrValidate,
    },
    {
        ...omgCurrency,
        validate: omgValidate,
    },
    {
        ...payCurrency,
        validate: payValidate,
    },
    {
        ...rcnCurrency,
        validate: rcnValidate,
    },
    {
        ...repCurrency,
        validate: repValidate,
    },
    {
        ...rlcCurrency,
        validate: rlcValidate,
    },
    {
        ...saltCurrency,
        validate: saltValidate,
    },
    {
        ...sntCurrency,
        validate: sntValidate,
    },
    {
        ...storjCurrency,
        validate: storjValidate,
    },
    {
        ...swtCurrency,
        validate: swtValidate,
    },
    {
        ...tusdCurrency,
        validate: tusdValidate,
    },
    {
        ...wingsCurrency,
        validate: wingsValidate,
    },
    {
        ...zrxCurrency,
        validate: zrxValidate,
    },
    {
        ...expCurrency,
        validate: expValidate,
    },
    {
        ...vibCurrency,
        validate: vibValidate,
    },
    {
        ...ocnCurrency,
        validate: ocnValidate,
    },
    {
        ...polyCurrency,
        validate: polyValidate,
    },
    {
        ...stormCurrency,
        validate: stormValidate,
    },
    {
        ...nanoCurrency,
        validate: nanoValidate,
    },
    {
        ...xrbCurrency,
        validate: xrbValidate,
    },
    {
        ...scCurrency,
        validate: scValidate,
    },
    {
        ...xscCurrency,
        validate: xscValidate,
    },
    {
        ...lokiCurrency,
        validate: lokiValidate,
    },
    {
        name: 'LBRY Credits',
        symbol: 'lbc',
        addressTypes: {prod: ['55'], testnet: []},
        validator: BTCValidator
    },
    {
        ...trxCurrency,
        validate: trxValidate,
    },
    {
        ...xemCurrency,
        validate: xemValidate,
    },
    {
        ...lskCurrency,
        validate: lskValidate,
    },
    {
        ...xlmCurrency,
        validate: xlmValidate,
    },
    {
        ...btuCurrency,
        validate: btuValidate,
    },
    {
        ...croCurrency,
        validate: croValidate,
    },
    {
        ...daiCurrency,
        validate: daiValidate,
    },
    {
        ...enjCurrency,
        validate: enjValidate,
    },
    {
        ...hedgCurrency,
        validate: hedgValidate,
    },
    {
        ...lbaCurrency,
        validate: lbaValidate,
    },
    {
        ...linkCurrency,
        validate: linkValidate,
    },
    {
        ...loomCurrency,
        validate: loomValidate,
    },
    {
        ...mkrCurrency,
        validate: mkrValidate,
    },
    {
        ...mtlCurrency,
        validate: mtlValidate,
    },
    {
        ...oceanCurrency,
        validate: oceanValidate,
    },
    {
        ...qntCurrency,
        validate: qntValidate,
    },
    {
        ...snxCurrency,
        validate: snxValidate,
    },
    {
        ...solveCurrency,
        validate: solveValidate,
    },
    {
        ...spndCurrency,
        validate: spndValidate,
    },
    {
        ...temcoCurrency,
        validate: temcoValidate,
    },
    {
        ...eosCurrency,
        validate: eosValidate,
    },
    {
        ...xtzCurrency,
        validate: xtzValidate,
    },
    {
        ...vetCurrency,
        validate: vetValidate,
    },
    {
        ...stmxCurrency,
        validate: stmxValidate,
    },
    {
        ...repv2Currency,
        validate: repv2Validate,
    },
    {
        ...fctCurrency,
        validate: fctValidate,
    },
    {
        ...bttCurrency,
        validate: bttValidate,
    },
    {
        ...qrlCurrency,
        validate: qrlValidate,
    },
    {
        ...servCurrency,
        validate: servValidate,
    },
    {
        ...xtpCurrency,
        validate: xtpValidate,
    },
    {
        ...compCurrency,
        validate: compValidate,
    },
    {
        ...paxCurrency,
        validate: paxValidate,
    },
    {
        ...usdcCurrency,
        validate: usdcValidate,
    },
    {
        ...cusdCurrency,
        validate: cusdValidate,
    },
    {
        ...algoCurrency,
        validate: algoValidate,
    },
    {
        ...dotCurrency,
        validate: dotValidate,
    },
    {
        ...uniCurrency,
        validate: uniValidate,
    },
    {
        ...aaveCurrency,
        validate: aaveValidate,
    },
    {
        ...maticCurrency,
        validate: maticValidate,
    },
    {
        ...manaCurrency,
        validate: manaValidate,
    },
    {
        ...solCurrency,
        validate: solValidate,
    },
];

module.exports = {
    getByNameOrSymbol: function (currencyNameOrSymbol) {
        var nameOrSymbol = currencyNameOrSymbol.toLowerCase();
        return CURRENCIES.find(function (currency) {
            return currency.name.toLowerCase() === nameOrSymbol || currency.symbol.toLowerCase() === nameOrSymbol
        });
    },
    getAll: function () {
        return CURRENCIES;
    }
};

////spit out details for readme.md
// CURRENCIES
//     .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
//     .forEach(c => console.log(`* ${c.name}/${c.symbol} \`'${c.name}'\` or \`'${c.symbol}'\` `));

////spit out keywords for package.json
// CURRENCIES
//     .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
//     .forEach(c => console.log(`"${c.name}","${c.symbol}",`));
//

