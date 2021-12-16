const {btcCurrency, btcValidate} = require("./currencies/btc");
const {ltcCurrency, ltcValidate} = require("./currencies/ltc");
const {ppcCurrency, ppcValidate} = require("./currencies/ppc");
const {dogeCurrency, dogeValidate} = require("./currencies/doge");
const {bvcCurrency, bvcValidate} = require("./currencies/bvc");
const {frcCurrency, frcValidate} = require("./currencies/frc");
const {ptsCurrency, ptsValidate} = require("./currencies/pts");
const {mecCurrency, mecValidate} = require("./currencies/mec");
const {xpmCurrency, xpmValidate} = require("./currencies/xpm");
const {aurCurrency, aurValidate} = require("./currencies/aur");
const {nmcCurrency, nmcValidate} = require("./currencies/nmc");
const {bioCurrency, bioValidate} = require("./currencies/bio");
const {grlcCurrency, grlcValidate} = require("./currencies/grlc");
const {vtcCurrency, vtcValidate} = require("./currencies/vtc");
const {btgCurrency, btgValidate} = require("./currencies/btg");
const {kmdCurrency, kmdValidate} = require("./currencies/kmd");
const {btczCurrency, btczValidate} = require("./currencies/btcz");
const {btcpCurrency, btcpValidate} = require("./currencies/btcp");
const {hushCurrency, hushValidate} = require("./currencies/hush");
const {sngCurrency, sngValidate} = require("./currencies/sng");
const {zecCurrency, zecValidate} = require("./currencies/zec");
const {zclCurrency, zclValidate} = require("./currencies/zcl");
const {zenCurrency, zenValidate} = require("./currencies/zen");
const {votCurrency, votValidate} = require("./currencies/vot");
const {dcrCurrency, dcrValidate} = require("./currencies/dcr");
const {pivxCurrency, pivxValidate} = require("./currencies/pivx");
const {slrCurrency, slrValidate} = require("./currencies/slr");
const {monaCurrency, monaValidate} = require("./currencies/mona");
const {dgbCurrency, dgbValidate} = require("./currencies/dgb");
const {dashCurrency, dashValidate} = require("./currencies/dash");
const {neoCurrency, neoValidate} = require("./currencies/neo");
const {gasCurrency, gasValidate} = require("./currencies/gas");
const {qtumCurrency, qtumValidate} = require("./currencies/qtum");
const {lbcCurrency, lbcValidate} = require("./currencies/lbc");
const {wavesCurrency, wavesValidate} = require("./currencies/waves");
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
        ...btcCurrency,
        validate: btcValidate,
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
        ...ltcCurrency,
        validate: ltcValidate,
    },
    {
        ...ppcCurrency,
        validate: ppcValidate,
    },
    {
        ...dogeCurrency,
        validate: dogeValidate,
    },
    {
        ...bvcCurrency,
        validate: bvcValidate,
    },
    {
        ...frcCurrency,
        validate: frcValidate,
    },
    {
        ...ptsCurrency,
        validate: ptsValidate,
    },
    {
        ...mecCurrency,
        validate: mecValidate,
    },
    {
        ...xpmCurrency,
        validate: xpmValidate,
    },
    {
        ...aurCurrency,
        validate: aurValidate,
    },
    {
        ...nmcCurrency,
        validate: nmcValidate,
    },
    {
        ...bioCurrency,
        validate: bioValidate,
    },
    {
        ...grlcCurrency,
        validate: grlcValidate,
    },
    {
        ...vtcCurrency,
        validate: vtcValidate,
    },
    {
        ...btgCurrency,
        validate: btgValidate,
    },
    {
        ...kmdCurrency,
        validate: kmdValidate,
    },
    {
        ...btczCurrency,
        validate: btczValidate,
    },
    {
        ...btcpCurrency,
        validate: btcpValidate,
    },
    {
        ...hushCurrency,
        validate: hushValidate,
    },
    {
        ...sngCurrency,
        validate: sngValidate,
    },
    {
        ...zecCurrency,
        validate: zecValidate,
    },
    {
        ...zclCurrency,
        validate: zclValidate,
    },
    {
        ...zenCurrency,
        validate: zenValidate,
    },
    {
        ...votCurrency,
        validate: votValidate,
    },
    {
        ...dcrCurrency,
        validate: dcrValidate,
    },
    {
        ...gameCurrency,
        validate: gameValidate,
    },
    {
        ...pivxCurrency,
        validate: pivxValidate,
    },
    {
        ...slrCurrency,
        validate: slrValidate,
    },
    {
        ...monaCurrency,
        validate: monaValidate,
    },
    {
        ...dgbCurrency,
        validate: dgbValidate,
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
        ...dashCurrency,
        validate: dashValidate,
    },
    {
        ...neoCurrency,
        validate: neoValidate,
    },
    {
        ...gasCurrency,
        validate: gasValidate,
    },
    {
        ...qtumCurrency,
        validate: qtumValidate,
    },
    {
        ...wavesCurrency,
        validate: wavesValidate,
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
        ...lbcCurrency,
        validate: lbcValidate,
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

