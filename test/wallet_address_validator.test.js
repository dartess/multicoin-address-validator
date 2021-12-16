const isPuppeteer = Boolean(global.__PUPPETEER__);

const WAValidator = !isPuppeteer && require('../src/wallet_address_validator');

if (isPuppeteer) {
    const path = require('path');
    const fs = require('fs');
    const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'wallet-address-validator.min.js'), 'utf8');
    beforeAll(async () => {
        await page.setContent(``);
        await page.evaluate(script);
    });
}

const isValid = async (address, currency, networkType) => {
    const fn = (a, c, n) => WAValidator.validate(a, c, n);
    return isPuppeteer
        ? await page.evaluate(fn, address, currency, networkType)
        : fn(address, currency, networkType);
}

async function valid(address, currency, networkType) {
    const valid = await isValid(address, currency, networkType);
    expect({ address, currency, valid, networkType }).toEqual({ address, currency, networkType, valid: true });
}

async function invalid(address, currency, networkType) {
    const valid = await isValid(address, currency, networkType);
    expect({ address, currency, valid }).toEqual({ address, currency, valid: false });
}

describe('WAValidator.validate()', function () {
    describe('valid results', function () {
        it('should return true for correct bitcoin addresses', async function () {
            await valid('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', 'bitcoin');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'bitcoin');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'BTC');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'Bitcoin');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'btc');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'btc', 'prod');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'btc', 'both');
            await valid('15uwigGExiNQxTNr1QSZYPXJMp9Px2YnVU', 'btc', 'prod');
            await valid('3FyVFsEyyBPzHjD3qUEgX7Jsn4tcHNZFkn', 'btc', 'prod');
            await valid('38mKdURe1zcQyrFqRLzR8PRao3iLGEPVsU', 'btc', 'prod');
            await valid('mptPo5AvLzJXi4T82vR6g82fT5uJ6HsQCu', 'btc', 'both');
            await valid('1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs', 'bitcoin');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'bitcoin', 'testnet');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'bitcoin', 'both');
            await valid('1HVDCg2KrPBH1Mg5SK9fGjAR9KVqyMMdBC', 'btc');

            await valid('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez', 'btc');
            await valid('116CGDLddrZhMrTwhCVJXtXQpxygTT1kHd', 'btc');

            // p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'bitcoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'bitcoin', 'testnet');

            // regtest
            await valid('GSa5espVLNseXEfKt46zEdS6jrPkmFghBU', 'bitcoin', 'testnet');

            // segwit addresses
            await valid('BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4', 'bitcoin');
            await valid('bc1q2t63ewm3mvh0ztmnmezxm7s0tefknenxlrlwrk', 'bitcoin');

            await valid('tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7', 'bitcoin', 'testnet');
            await valid('tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy', 'bitcoin', 'testnet');

            await invalid("tc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty", 'bitcoin');
            await invalid('bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7k7grplx', 'bitcoin');
            await invalid('BC1SW50QA3JX3S', 'bitcoin');
            await invalid('bc1zw508d6qejxtdg4y5r3zarvaryvg6kdaj', 'bitcoin');
            await invalid("bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5", 'bitcoin');
            await invalid("BC13W508D6QEJXTDG4Y5R3ZARVARY0C5XW7KN40WF2", 'bitcoin');
            await invalid("bc1rw5uspcuh", 'bitcoin');
            await invalid("bc10w508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90", 'bitcoin');
            await invalid("BC1QR508D6QEJXTDG4Y5R3ZARVARYV98GJ9P", 'bitcoin');
            await invalid("tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sL5k7", 'bitcoin');
            await invalid("bc1zw508d6qejxtdg4y5r3zarvaryvqyzf3du", 'bitcoin');
            await invalid("tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3pjxtptv", 'bitcoin');
            await invalid("bc1gmk9yu", 'bitcoin')
        });

        it('should return true for correct bitcoincash addresses', async function () {
            await valid('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', 'bitcoincash');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'bitcoincash');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'BCH');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'bch');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'bch', 'prod');
            await valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'bch', 'both');
            await valid('1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs', 'bitcoincash');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'bitcoincash', 'testnet');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'bitcoincash', 'both');

            // p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'bitcoincash');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'bitcoincash', 'testnet');

            await valid('bitcoincash:qq4v32mtagxac29my6gwj6fd4tmqg8rysu23dax807', 'bch');

        });

        it('should return true for correct litecoin addresses', async function () {
            await valid('LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9', 'litecoin');
            await valid('LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9', 'LTC');
            await valid('LTpYZG19YmfvY2bBDYtCKpunVRw7nVgRHW', 'litecoin');
            await valid('Lb6wDP2kHGyWC7vrZuZAgV7V4ECyDdH7a6', 'litecoin');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'litecoin', 'testnet');

            // p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'litecoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'litecoin', 'testnet');
            await valid('QW2SvwjaJU8LD6GSmtm1PHnBG2xPuxwZFy', 'litecoin', 'testnet');
            await valid('QjpzxpbLp5pCGsCczMbfh1uhC3P89QZavY', 'litecoin', 'testnet');

            // segwit addresses
            await valid('ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfea', 'litecoin');
            await valid('ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfea', 'litecoin', { networkType: 'prod' });
            await valid('tltc1qu78xur5xnq6fjy83amy0qcjfau8m367defyhms', 'litecoin', { networkType: 'testnet' });
        });

        it('should return true for correct peercoin addresses', async function () {
            await valid('PHCEsP6od3WJ8K2WKWEDBYKhH95pc9kiZN', 'peercoin');
            await valid('PSbM1pGoE9dnAuVWvpQqTTYVpKZU41dNAz', 'peercoin');
            await valid('PUULeHrJL2WujJkorc2RsUAR3SardKUauu', 'peercoin');
            await valid('PUULeHrJL2WujJkorc2RsUAR3SardKUauu', 'PPC');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'peercoin', 'testnet');

            // p2sh addresses
            await valid('pNms4CaWqgZUxbNZaA1yP2gPr3BYnez9EM', 'peercoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'peercoin', 'testnet');
        });

        it('should return true for correct dogecoin addresses', async function () {
            await valid('DPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSU', 'dogecoin');
            await valid('DNzLUN6MyYVS5zf4Xc2yK69V3dXs6Mxia5', 'dogecoin');
            await valid('DPS6iZj7roHquvwRYXNBua9QtKPzigUUhM', 'dogecoin');
            await valid('DPS6iZj7roHquvwRYXNBua9QtKPzigUUhM', 'DOGE');
            //TODO: NEED A DOGECOIN TESTNET ADDRESS

            //p2sh addresses
            await valid('A7JjzK9k9x5b2MkkQzqt91WZsuu7wTu6iS', 'dogecoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'dogecoin', 'testnet');
        });

        it('should return true for correct beavercoin addresses', async function () {
            await valid('BPPtB4EpPi5wCaGXZuNyKQgng8ya579qUh', 'beavercoin');
            await valid('BC1LLYoE4mTCHTJhVYvLGxhRTwAHyWTQ49', 'beavercoin');
            await valid('BBuyeg2vjtyFdMNj3LTxuVra4wJMKVAY9C', 'beavercoin');
            await valid('BBuyeg2vjtyFdMNj3LTxuVra4wJMKVAY9C', 'BVC');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'beavercoin', 'testnet');

            // p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'beavercoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'beavercoin', 'testnet');
        });

        it('should return true for correct freicoin addresses', async function () {
            await valid('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 'freicoin');
            await valid('1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs', 'freicoin');
            await valid('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez', 'freicoin');
            await valid('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez', 'FRC');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'freicoin', 'testnet');

            // p2sh addresse
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'freicoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'freicoin', 'testnet');
        });

        it('should return true for correct protoshares addresses', async function () {
            await valid('PaNGELmZgzRQCKeEKM6ifgTqNkC4ceiAWw', 'protoshares');
            await valid('Piev8TMX2fT5mFtgxx2TXJaqXP37weMPuD', 'protoshares');
            await valid('PgsuLoe9ojRKFGJGVpqqk37gAqNJ4ozboD', 'protoshares');
            await valid('PgsuLoe9ojRKFGJGVpqqk37gAqNJ4ozboD', 'PTS');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'protoshares', 'testnet');

            //p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'protoshares');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'protoshares', 'testnet');
        });

        it('should return true for correct megacoin addresses', async function () {
            await valid('MWUHaNxjXGZUYTh92i3zuDmsnH1rHSBk5M', 'megacoin');
            await valid('MSAkrhRyte7bz999Ga5SqYjzypFFYa2oEb', 'megacoin');
            await valid('MLUTAtDQFcfo1QACWocLuufFq5fBDTpCHE', 'megacoin');
            await valid('MLUTAtDQFcfo1QACWocLuufFq5fBDTpCHE', 'MEC');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'megacoin', 'testnet');

            //p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'megacoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'megacoin', 'testnet');
        });

        it('should return true for correct primecoin addresses', async function () {
            await valid('AVKeiZ5JadfWdH2EYVgVRfX4ufoyd4ehuM', 'primecoin');
            await valid('AQXBRPyob4dywUJ21RUKrR1xetQCDVenKD', 'primecoin');
            await valid('ANHfTZnskKqaBU7oZuSha9SpbHU3YBfeKf', 'primecoin');
            await valid('AYdiYMKSGYxLcZNDmqB8jNcck7SQibrfiK', 'primecoin');
            await valid('AYdiYMKSGYxLcZNDmqB8jNcck7SQibrfiK', 'XPM');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'primecoin', 'testnet');

            //p2sh addresses
            await valid('af5CvTQq7agDh717Wszb5QDbWb7nT2mukP', 'primecoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'primecoin', 'testnet');
        });

        it('should return true for correct auroracoin addresses', async function () {
            await valid('ARM3GLZXF1PDTZ5vz3wh5MVahbK9BHTWAN', 'auroracoin');
            await valid('AUtfc6ThCLb7FuEu7QPrWpJuaXaJRPciDF', 'auroracoin');
            await valid('AUN1oaj5hjispGnczt8Aruw3TxgGyRqB3V', 'auroracoin');
            await valid('AXGcBkGX6NiaDXj85C5dCrhTRUgwxSkKDK', 'auroracoin');
            await valid('AXGcBkGX6NiaDXj85C5dCrhTRUgwxSkKDK', 'AUR');
            await valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'auroracoin', 'testnet');

            //p2sh addresses
            await valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 'auroracoin');
            await valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 'auroracoin', 'testnet');
        });

        it('should return true for correct namecoin addresses', async function () {
            await valid('NEpeRmS775fnti8TDgJA28m8KLEfNNRZvT', 'namecoin');
            await valid('MyJ691bGJ48RBK2LS8n1U57wcFLFScFXxi', 'namecoin');
            await valid('NFY9aw1RXLGtWpeqgNQXprnUcZXyKNinTh', 'namecoin');
            await valid('NCPPc7Pzb75CpRPJQPRRh6ouJTq7BCy1H4', 'namecoin');
            await valid('NCPPc7Pzb75CpRPJQPRRh6ouJTq7BCy1H4', 'NMC');
        });

        it('should return true for correct BioCoin addresses', async function () {
            await valid('B7xseoLGk7hEpMDDeSvZDKmmiAMHWiccok', 'biocoin');
            await valid('B8zjmYFGhWmiaQSJshfrnefE72xCapCkvo', 'biocoin');
            await valid('muH8LL42DiMs8GEQ6Grfi8KUw2uFvuKr1J', 'biocoin', 'testnet');
            await valid('muH8LL42DiMs8GEQ6Grfi8KUw2uFvuKr1J', 'BIO', 'testnet');
            await valid('B8zjmYFGhWmiaQSJshfrnefE72xCapCkvo', 'BIO');
        });

        it('should return true for correct Garlicoin addresses', async function () {
            await valid('GU2NtcNotWFiZjTp2Vdgf5CjeMfgsWYCua', 'garlicoin');
            await valid('GNWeWaoQ6rv21ZFjJWT9vb91hXUzFTLkru', 'garlicoin');
            await valid('mjKbQTkgwzmsL3J86tdVzhyW9pc4NePqTb', 'garlicoin', 'testnet');
            await valid('mnYp36NuyRavMKQ9Q9Q6oGqoorAs9p3zYn', 'GRLC', 'testnet');
            await valid('GU2NtcNotWFiZjTp2Vdgf5CjeMfgsWYCua', 'GRLC');
        });

        it('should return true for correct Vertcoin addresses', async function () {
            await valid('3PgeyhEJEnS5CeBu3iFcu3JHVKemeHx1AW', 'VTC');
            await valid('353nERPQKhGj4WGzoiWcareA76TPgRCVNA', 'VTC');
            await valid('376g4TmL8uQKFYsRFrbv5iz9srmb5bocEt', 'VTC');
            await valid('3AMtM4Zk5oNHu9i4jDiwKB6Kg5YEReBsav', 'VTC');

            await valid('VmoMjGf3zgZLy8sk3PMKd3xikZHXWvnYi7', 'vertcoin');
            await valid('VmhHwXr3J8xMZpy62WuBGpu3xVvThWzcTQ', 'vertcoin');
            await valid('mvww6DEJ18dbyQUukpVQXvLgrNDJazZn1Y', 'vertcoin', 'testnet');
            await valid('mn3mdEE6cf1snxVsknNz4GRTdSrWXqYp7c', 'VTC', 'testnet');
            await valid('Vri6Q4GgNFfdtcpxD961TotJwaSaYQCaL5', 'VTC');
        });

        it('should return true for correct BitcoinGold addresses', async function () {
            await valid('GW3JrQyHtoVfEFES3Y9JagiX3VSKQStLwj', 'bitcoingold');
            await valid('GUDWdeMyAXQbrNFFivAhkJQ1GfBCFdc7JF', 'bitcoingold');
            await valid('mvww6DEJ18dbyQUukpVQXvLgrNDJazZn1Y', 'bitcoingold', 'testnet');
            await valid('mn3mdEE6cf1snxVsknNz4GRTdSrWXqYp7c', 'BTG', 'testnet');
            await valid('GSNFPRsdaM3MXrU5HW1AxgFwmUQC8HXK9F', 'BTG');
        });

        it('should return true for correct Decred addresses', async function () {
            await valid('Dsesax2GJnMN4wwmWo5rJGq73dDK217Rh85', 'DCR');
            await valid('DsYuxtvGRfN8rncXAndtLUpJm55F77K17RA', 'decred');
            await valid('DsaXDG2NrJW8g4tFAb8n9MNx81Sn3Qc8AEV', 'decred');
            await valid('TsijUgejaRnLKF5WAbpUxNtwKGUiKVeXLr7', 'decred', 'testnet');
            await valid('TsZ9QmAoadF12hGvyALp6qvaF4be3BmLqG9', 'dcr', 'testnet');
        });

        it('should return true for correct Digibyte addresses', async function () {
            await valid('DG2rM2orU2JH5i4ACh3AKNpRTNESdv5xf8', 'DGB');
            await valid('DBR2Lj1F17eHGHXgbpae2Wb4m39bDyA1qo', 'DGB');
            await valid('D9TDZTR9Z9Mx2NoDJnhqhnYhDLKRAmsL9n', 'digibyte');
            await valid('DHRzA1YHA1kFWpz2apRckZJy6KZRyGq4EV', 'digibyte');
            await valid('DJ53hTyLBdZp2wMi5BsCS3rtEL1ioYUkva', 'digibyte');
            await valid('dgb1q00002724tefpjkpn8mp233uyqwd8hnny55e0zg', 'DGB', 'prod')
            await valid('SiEgX2mSYJjVN9YGuC23uckE6BS1ZSHcGD', 'DGB', 'prod')
        });

        it('should return true for correct Ethereum addresses', async function () {
            await valid('0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF', 'ethereum');
            await valid('0xa00354276d2fC74ee91e37D085d35748613f4748', 'ethereum');
            await valid('0xAff4d6793F584a473348EbA058deb8caad77a288', 'ETH');
            await valid('0xc6d9d2cd449a754c494264e1809c50e34d64562b', 'ETH');
            await valid('0x52908400098527886E0F7030069857D2E4169EE7', 'ETH');
            await valid('0x8617E340B3D01FA5F11F306F4090FD50E238070D', 'ETH');
            await valid('0xde709f2102306220921060314715629080e2fb77', 'ETH');
            await valid('0x27b1fdb04752bbc536007a920d24acb045561c26', 'ETH');
            await valid('0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed', 'ETH');
            await valid('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359', 'ETH');
            await valid('0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB', 'ETH');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'ETH');

            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'ethereumclassic');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'ETC');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'etherzero');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'ETZ');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'callisto');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'CLO');
        });

        it('should return true for correct Ripple addresses', async function () {
            await valid('rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn', 'ripple');
            await valid('rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn', 'XRP');
            await valid('r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV', 'XRP');
            await valid('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'XRP');
            await valid('rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhmN', 'XRP');
        });

        it('should return true for correct dash addresses', async function () {
            await valid('Xx4dYKgz3Zcv6kheaqog3fynaKWjbahb6b', 'dash');
            await valid('XcY4WJ6Z2Q8w7vcYER1JypC8s2oa3SQ1b1', 'DASH');
            await valid('XqMkVUZnqe3w4xvgdZRtZoe7gMitDudGs4', 'dash');
            await valid('yPv7h2i8v3dJjfSH4L3x91JSJszjdbsJJA', 'dash', 'testnet');
            await valid('XoAAqv3oUYZ6xRjX3brfbf9PotrGanS6Th', 'dash');
            await valid('yP5oXZQXBfBf9FyfZDpFiKDypxuNUKUV2E', 'dash', 'testnet');
        });

        it('should return true for correct neo addresses', async function () {
            await valid('AR4QmqYENiZAD6oXe7ftm6eDcwtHk7rVTT', 'neo');
            await valid('AKDVzYGLczmykdtRaejgvWeZrvdkVEvQ1X', 'NEO');
        });

        it('should return true for correct neo gas addresses', async function () {
            await valid('AR4QmqYENiZAD6oXe7ftm6eDcwtHk7rVTT', 'neogas');
        });

        it('should return true for correct qtum addresses', async function () {
            await valid('QNjUiD3bVVZwYTc5AhpeQbS1mfb2guyWhe', 'qtum');
            await valid('QVZnSrMwKp6AL4FjUPPnfFgsma6j1DXQXu', 'QTUM');
            await valid('MCgyroQse81wuv5RwPpY5DXDNxeafzLFJ8', 'QTUM');
            await valid('QQYySVc5WEe3g6PnNFYmspqG5CfSG8rnma', 'QTUM');
            await valid('MSvJQBJMZs1dhxz7UAWa2si4iyMD2FHQd5', 'QTUM');

            await valid('qcSLSxN1sngCWSrKFZ6UC7ri4hhVSdq9SU', 'qtum', 'testnet');
            await valid('qJnbEdrm9ybjVqDCaX5SWNBHmZy2X7YbPT', 'qtum', 'testnet');
            await valid('qchBPDUYswobzpDmY5DsTStt74sTYQtaQv', 'qtum', 'testnet');
        });

        it('should return true for correct votecoin addresses', async function () {
            await valid('t1U9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'votecoin');
            await valid('t3Vz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'VOT');
            await valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'votecoin', 'testnet');
        });

        it('should return true for correct bitcoinz addresses', async function () {
            await valid('t1U9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'bitcoinz');
            await valid('t3Vz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'BTCZ');
            await valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'bitcoinz', 'testnet');
        });

        it('should return true for correct zclassic addresses', async function () {
            await valid('t1U9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'zclassic');
            await valid('t3Vz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'ZCL');
            await valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'zclassic', 'testnet');
        });

        it('should return true for correct hush addresses', async function () {
            await valid('t1U9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'hush');
            await valid('t3Vz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'HUSH');
            await valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'hush', 'testnet');
        });

        it('should return true for correct zcash addresses', async function () {
            await valid('t1U9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'zcash');
            await valid('t3Vz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'ZEC');
            await valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'zcash', 'testnet');
        });

        it('should return true for correct bitcoinprivate addresses', async function () {
            await valid('b1M4XXPFhwMb1SP33yhzn3h9qWXjujkgep4', 'bitcoinprivate');
            //valid('bx....', 'BTCP');
            //valid('nx....', 'bitcoinprivate', 'testnet');
        });

        it('should return true for correct snowgem addresses', async function () {
            await valid('s1fx7WBkjB4UH6qQjPp6Ysmtr1C1JiTK2Yw', 'snowgem');
            await valid('s3d27MhkBRt3ha2UuxhjXaYF4DCnttTMnL1', 'SNG');
            await valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'snowgem', 'testnet');
        });

        it('should return true for correct zencash addresses', async function () {
            await valid('znhiGGfYRepxkBjXYvA2kFrXiC351i9ta4z', 'zencash');
            await valid('zssEdGnZCQ9G86LZFtbynMn1hYTVhn6eYCL', 'ZEN');
            await valid('ztmWMDLWjbruCJxKmmfAZiT6QAQdiv5F291', 'zencash', 'testnet');
        });

        it('should return true for correct komodo addresses', async function () {
            await valid('R9R5HirAzqDcWrWGiJEL115dpV3QB3hobH', 'komodo');
            await valid('RAvj2KKVUohTu3hVdNJ4U6hQi7TNawpacH', 'KMD');
            //valid('t2UNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'komodo', 'testnet');
        });

        it('should return true for correct Bankex addresses', async function () {
            await valid('0xeac39e1bc802baae3d4b9cb518f3f60374bbad6c', 'bankex');
            await valid('0x45245bc59219eeaaf6cd3f382e078a461ff9de7b', 'BKX');
            await valid('0xf40d80FCfa5cdEa0bB1E570c2D52132ac9bC6aEC', 'bankex', 'testnet');
            await valid('0x8A7395f281EeCf2B471B689E87Cf4C7fa8bb957d', 'BKX', 'testnet');
        });

        it('should return true for correct Cardano addresses', async function () {
            await valid('Ae2tdPwUPEYzs5BRbGcoS3DXvK8mwgggmESz4HqUwMyaS9eNksZGz1LMS9v', 'ada');
            await valid('Ae2tdPwUPEYxYNJw1He1esdZYvjmr4NtPzUsGTiqL9zd8ohjZYQcwu6kom7', 'cardano');
            await valid('DdzFFzCqrhsfdzUZxvuBkhV8Lpm9p43p9ubh79GCTkxJikAjKh51qhtCFMqUniC5tv5ZExyvSmAte2Du2tGimavSo6qSgXbjiy8qZRTg', 'ada');
            await valid('Ae2tdPwUPEZKmwoy3AU3cXb5Chnasj6mvVNxV1H11997q3VW5ihbSfQwGpm', 'ada');
            await valid('4swhHtxKapQbj3TZEipgtp7NQzcRWDYqCxXYoPQWjGyHmhxS1w1TjUEszCQT1sQucGwmPQMYdv1FYs3d51KgoubviPBf', 'cardano');

            await valid('addr1qxy3w62dupy9pzmpdfzxz4k240w5vawyagl5m9djqquyymrtm3grn7gpnjh7rwh2dy62hk8639lt6kzn32yxq960usnq9pexvt', 'cardano');
            await valid('addr1skemppwfevyk0lshu2w8j34707s3t3t58a04xcx5ccevrcmvpmxg2qt4pk0', 'cardano', 'testnet');
        });

        it('should return true for correct monero addresses', async function () {
            await valid('47zQ5LAivg6hNCgijXSEFVLX7mke1bgM6YGLFaANDoJbgXDymcAAZvvMNt2PmMpqEe5qRy2zyfMYXdwpmdyitiFh84xnPG2', 'monero');
            await valid('48bWuoDG75CXMDHbmPEvUF2hm1vLDic7ZJ7hqRkL65QR9p13AQAX4eEACXNk4YP115Q4KRVZnAvmMBHrcGfv9FvKPZnH6vH', 'XMR');
            await valid('88WB4JKdQVhWfkc8cBT9EEJ6vejSAqKJHbV1dXBAXdpgQovtNDNRxfKCS7wB8rHQ5D5zH2Pd1YkyMNNQDie6ZfeZ311fPgn', 'XMR');
            await valid('A2be3UvzMtkJtxRYgcCbQt2y7Rp2eLVGqNTWfZeankrWimSMM4y7uMP6B9oAZaHsXTj8KFSerkSkkVRuEuEca9QM8VhxCNU', 'monero', 'testnet');

            //integrated addresses
            await valid('4Gd4DLiXzBmbVX2FZZ3Cvu6fUaWACup1qDowprUCje1kSP4FmbftiJMSfV8kWZXNqmVwj4m52xqtgFNUudVmsmGkGvkLcCibWfVUfUFVB7', 'monero');
            await valid('4J5sF94AzXgFgx8LuWc9dcWkJkGkD3cL3L2AuhX6QA9jFvSxxj6QhHqHXqM2b2Go7G8RyDzEbHxYd9G26XUUbuJChipEyBz9fENMU2Ua9b', 'XMR');

            await valid('9uXRFi4PZMqhsnthBF6bGdfVnBSZtfKkR7Td8qPM7jUKZeTfR1tLhCoTLqYNE12xuiQg3aWGiLw83bWsqwTRLaM4Jk47xYM', 'XMR', 'testnet');
            await valid('9tFTaQM39JXhULZsHauPHhjFrjcGSGXoijEPYoRgAky9Veck2mFp3EifQ2tKHmEHuuUoFfgYRNR2bVaborz5oi8JA8xkqjY', 'monero', 'testnet')

            //stagenet public address
            await valid('5BAP9qLbRseYrGneYVRaFANMajuaD4KZrf3fGWvt5cVDR1xUXm6qoFYLkgU6Vp12fs2R24r4269inAWHFEdsLnE87rGCxYK', 'XMR', 'stagenet');

            //stagenet integrated address
            await valid('5Ls4AeA639AYrGneYVRaFANMajuaD4KZrf3fGWvt5cVDR1xUXm6qoFYLkgU6Vp12fs2R24r4269inAWHFEdsLnE8BCU5Q2gDkbq2HYDrn2', 'monero', 'both');
        });

        it('should return true for correct erc20 addresses', async function () {
            await valid('0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB', 'game');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'game');

            await valid('0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB', 'usdc');
            await valid('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb', 'usdc');
        });

        it('should return true for correct monacoin addresses', async function () {
            await valid('MMN1Q1aRVUzanmg9DJjcRYzQSJQoBeQPui', 'mona');
            await valid('PFMzNYnBm5X4c9qJkJPkfgdCyd9fuuy2vT', 'mona');
            await valid('PCtN7VUYHW8w4g59BaphrfPs8g7pNgAzxn', 'mona');
            await valid('MXCcYFGRmsd4d3CcQugFiqG8uarj5tVu76', 'mona');
            await valid('MNK1pGsBf9WdoE54fZM9VFhkeYHW6VUf2u', 'mona');
        });

        it('should return true for correct pivx addresses', async function () {
            await valid('DJXFW9oJJBUX7QKrG6GKvmTs63MYKzwtpZ', 'pivx');
            await valid('DEaYb8EHQgyKvX6VXDS3DZQautJrHBmK3T', 'pivx');
            await valid('DDeCGR3QSgqsBxVR23bJvteiyYE34ZmxAc', 'pivx');
            await valid('DSqQM8DPpBHHoZXHgRdwmaf6hZPEoZcFkh', 'pivx');
        });

        it('should return true for correct solarcoin addresses', async function () {
            await valid('8VxVLzwB26E2YZZ82o1NcQe96QSM2z6GwW', 'slr');
            await valid('8YW5qcTjeyqX5kESsqu2BUdXiedgssegtQ', 'SolarCoin');
        });

        it('should return true for correct tap addresses', async function () {
            await valid('0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a', 'xtp');
            await valid('0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a', 'tap');
        });

        it('should return true for correct tether addresses', async function () {
            await valid('3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL', 'usdt');
            await valid('1KdXaqcBeoMAFVAPwTmYvDbEq6RnvNPF6J', 'tether');
            await valid('0xF6f6ebAf5D78F4c93Baf856d3005B7395CCC272e', 'usdt');
            await valid('0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a', 'tether');
            await valid('3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL', 'usdt', { chainType: 'omni' });
            await valid('0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a', 'tether', { chainType: 'erc20' });
        });

        it('should return true for correct expanse addresses', async function () {
            await valid('0xbab463743603a253bdf1f84975b1a9517505ae05', 'exp');
            await valid('0x5d0777cb5d6977873904864c6ab531f4b3261f0b', 'expanse');
        });

        it('should return true for correct waves addresses', async function () {
            await valid('3P93mVrYnQ4ahaRMYwA2BeWY32eDxTpLVEs', 'waves');
            await valid('3P4eeU7v1LMHQFwwT2GW9W99c6vZyytHajj', 'waves');

            await valid('3Myrq5QDgRq3nBVRSSv9UYrP36xTtpJND5y', 'waves', 'testnet');
            await valid('3My3KZgFQ3CrVHgz6vGRt8687sH4oAA1qp8', 'waves', 'testnet');
        });

        it('should return true for correct nano addresses', async function () {
            await valid('xrb_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3', 'nano');
            await valid('xrb_13ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo', 'nano');
            await valid('xrb_35jjmmmh81kydepzeuf9oec8hzkay7msr6yxagzxpcht7thwa5bus5tomgz9', 'nano');
            await valid('xrb_1111111111111111111111111111111111111111111111111111hifc8npp', 'nano');
            await valid('xrb_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est', 'nano');
            await valid('xrb_3wm37qz19zhei7nzscjcopbrbnnachs4p1gnwo5oroi3qonw6inwgoeuufdp', 'nano');
            await valid('xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4', 'nano');
            await valid('xrb_1f5e4w33ndqbkx4bw5jtp13kp5xghebfxcmw9hdt1f7goid1s4373w6tjmgu', 'nano');
            await valid('xrb_1q79ahdr36uqn38p5tp5sqwkn73rnpj1k8obtuetdbjcx37d5gahhd1u9cuh', 'nano');
            await valid('nano_1q79ahdr36uqn38p5tp5sqwkn73rnpj1k8obtuetdbjcx37d5gahhd1u9cuh', 'nano');
        });

        it('should return true for correct siacoin addresses', async function () {
            await valid('a9b01c85163638682b170d82de02b8bb99ba86092e9ab1b0d25111284fe618e93456915820f1', 'siacoin')
            await valid('ab0c327982abfcc6055a6c9551589167d8a73501aca8769f106371fbc937ad100c955c3b7ba9', 'siacoin')
            await valid('ffe1308c044ade30392a0cdc1fd5a4dbe94f9616a95faf888ed36123d9e711557aa497530373', 'siacoin')
        })

        it('should return true for correct loki addresses', async function () {
            // public
            await valid('L63ymg8cb5aRz1PhXrEQ22PWw9KBhBS8rMsgqbABhTGFfh53U3Rc2iWCJpCPsHZT5hfyt7fPQa612a5Z1tBnGYEA9h6YHnn', 'loki')
            await valid('L5QKRGMNpQU3eCAdjMVTCR631bRKqnW1oEWWBEHAtFJLieA5VvuxyyubCd9FczEEatg8jfy39UJZ13npLJqZG6dtMtM99ha', 'loki')
            //   integrated
            await valid('LK8CGQ17G9R3ys3Xf33wCeViD2B95jgdpjAhcRsjuheJ784dumXn7g3RPAzedWpFq364jJKYL9dkQ8mY66sZG9BiD1xbPb6dpYo7toNRqk', 'loki')
            await valid('LK8CGQ17G9R3ys3Xf33wCeViD2B95jgdpjAhcRsjuheJ784dumXn7g3RPAzedWpFq364jJKYL9dkQ8mY66sZG9BiCtWq1AYo1oJTVqgUcQ', 'loki')
            //   subaddress
            await valid('LW1VMYcvWPZZJ2h1pKGEku2y9WeDiAU2VhgrgVgvjybaRuCdcEkg6FhXjVNSd37Bp7fhYH8tVa5T9VmRaYiWyxYdCpEGBg8', 'loki')
        })

        it('should return true for correct lbry addresses', async function () {
            await valid('bDb6NmobyDVeNGpizWQQBZkYjKCRQBdKdG', 'LBC')
            await valid('bTFXPcV3a8iVDezogvHTHezWZ1mZGWpPDc', 'lbc')
            await valid('bNEMVqeUZUqTrYUxud5ehnUhtTAiWDXQ5e', 'lbc')
            await valid('bK2uEVn6UuwjCTUZ1Dfj5HhWYi9BtqZDDm', 'lbc')
            await valid('bK2uEVn6UuwjCTUZ1Dfj5HhWYi9BtqZDDm', 'LBRY Credits')
        })

        it('should return true for correct trx addresses', async function () {
            await valid('TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg3r', 'trx');
            await valid('27bLJCYjbH6MT8DBF9xcrK6yZnm43vx7MNQ', 'trx', 'testnet');
        });

        it('should return true for correct nem addresses', async function () {
            await valid('NBZMQO7ZPBYNBDUR7F75MAKA2S3DHDCIFG775N3D', 'xem');
            await valid('TDWTRGT6GVWCV7GRWFNI45S53PGOJBKNUF3GE6PB', 'xem', 'testnet');
        });

        it('should return true for correct lsk addresses', async function () {
            await valid('469226551L', 'lsk');
            await valid('15823701926930889868L', 'lsk');
            await valid('1657699692452120239L', 'lsk');
            await valid('555666666999992L', 'lsk');
            await valid('6853061742992593192L', 'lsk');
            await valid('530464791801L', 'lsk');
        });

        it('should return true for correct bsv addresses', async function () {
            await valid('qzwryn9fxnpqkf7zt878tp2g9cg8kpl65qh2ml0w0r', 'bsv');
            await valid('qp65yngy5uds4wxtrkynptal4f76qzmrh52pa3mpaf', 'bsv');
            await valid('bitcoincash:qq4v32mtagxac29my6gwj6fd4tmqg8rysu23dax807', 'bsv');
            await valid('qq4v32mtagxac29my6gwj6fd4tmqg8rysu23dax807', 'bsv');
            await valid('qz97s7ee0rvwlymtxrwafmvs87x6027jwuf3wepug7', 'bsv');
            await valid('bitcoincash:qpp32ssez340wfspnt79h6c4xds4fzf3m5j0cplx0l', 'bsv');
            await valid('qqg82u7tq2eahs3gkh9m6kjnmjehr69m5v37alepq4', 'bsv');
            await valid('bitcoincash:qrwkk9a3es2wu7mdvzh0vekfvjuzysq8tv7r3hcwr5', 'bsv');
            await valid('1DrNXqCj2B8FKyx66RAWDkiEJhw2yrvhT3', 'bsv');
        });

        it('should return true for correct stellar addresses', async function () {
            await valid('GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB', 'stellar');
            await valid('GB7KKHHVYLDIZEKYJPAJUOTBE5E3NJAXPSDZK7O6O44WR3EBRO5HRPVT', 'stellar');
            await valid('GD6WVYRVID442Y4JVWFWKWCZKB45UGHJAABBJRS22TUSTWGJYXIUR7N2', 'stellar');
            await valid('GBCG42WTVWPO4Q6OZCYI3D6ZSTFSJIXIS6INCIUF23L6VN3ADE4337AP', 'stellar');
            await valid('GDFX463YPLCO2EY7NGFMI7SXWWDQAMASGYZXCG2LATOF3PP5NQIUKBPT', 'stellar');
            await valid('GBXEODUMM3SJ3QSX2VYUWFU3NRP7BQRC2ERWS7E2LZXDJXL2N66ZQ5PT', 'stellar');
            await valid('GAJHORKJKDDEPYCD6URDFODV7CVLJ5AAOJKR6PG2VQOLWFQOF3X7XLOG', 'stellar');
            await valid('GACXQEAXYBEZLBMQ2XETOBRO4P66FZAJENDHOQRYPUIXZIIXLKMZEXBJ', 'stellar');
            await valid('GDD3XRXU3G4DXHVRUDH7LJM4CD4PDZTVP4QHOO4Q6DELKXUATR657OZV', 'stellar');
            await valid('GDTYVCTAUQVPKEDZIBWEJGKBQHB4UGGXI2SXXUEW7LXMD4B7MK37CWLJ', 'stellar');
            await valid('GDTYVCTAUQVPKEDZIBWEJGKBQHB4UGGXI2SXXUEW7LXMD4B7MK37CWLJ', 'xlm');
            await valid('GCCVYKDNQP7NGNTR42SYPMQUZIFTPJUJHXM6JIXQMDLXMCC3ZYOV6AG3', 'xlm', 'testnet');
        });

        it('should return true for correct xtz(tezos) address', async function () {
            await valid('tz1Lhf4J9Qxoe3DZ2nfe8FGDnvVj7oKjnMY6', 'xtz');
            await valid('tz1PyxsQ7xVTa5J7gtBeT7pST5Zi5nk5GSjg', 'xtz');
            await valid('tz1LcuQHNVQEWP2fZjk1QYZGNrfLDwrT3SyZ', 'xtz');
            await valid('tz1RR6wETy9BeXG3Fjk25YmkSMGHxTtKkhpX', 'xtz');
            await valid('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY', 'xtz');
            await valid('KT1EM2LvxxFGB3Svh9p9HCP2jEEYyHjABMbK', 'xtz');
        });

        it('should return true for correct eos addresses', async function () {
            await valid('bittrexacct1', 'eos');
            await valid('binancecleos', 'eos');
            await valid('123456789012', 'eos');
            await valid('12345678.012', 'eos');
        });

        it('should return true for correct vet addresses', async function () {
            await valid('0xa7E43b445cF68CAa143a884AF673121447F29EAe', 'vet');
            await valid('0x46B8aABa5Eaa84Dc074c350eD57D8b3c35B90E09', 'VeChain');
            await valid('0x6d57D1697277C9Bb01A5265EC00558A639CA308A', 'VET');
        });

        it('should return true for correct algo addresses', async function () {
            await valid('GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7Y', 'algo');
            await valid('LCRDY3LYAANTVS3XRHEHWHGXRTKZYVTX55P5IA2AT5ZDJ4CWZFFZIKVHLI', 'algo')
            await valid('SP745JJR4KPRQEXJZHVIEN736LYTL2T2DFMG3OIIFJBV66K73PHNMDCZVM', 'algo')
            await valid('AKHSHWO2TUWE53RMVG6ZUBNAEX6MTYPT76TCIDCDWYUUTK6HCJTZS2HDQU', 'algo')
        });

        it('should return true for correct dot addresses', async function () {
            await valid('1iQPKJmghHbrRhUiMt2cNEuxYbR6S9vYtJKqYvE4PNR9WDB', 'dot');
            await valid('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg', 'dot');
            await valid('5CK8D1sKNwF473wbuBP6NuhQfPaWUetNsWUNAAzVwTfxqjfr', 'dot');
            await valid('CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp', 'dot');
            await valid('15FKUKXC6kwaXxJ1tXNywmFy4ZY6FoDFCnU3fMbibFdeqwGw', 'dot');
            await valid('CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M', 'dot');
        });

        it('should return true for correct cro addresses', async function () {
            await valid('cro1yjjlx5qsrj5rxn5xtd5rkm6dcqzlchxkrvsmg6', 'cro');
            await valid('cro1mwdzawjd27uku0cqf8zngxfcycd292u353xe7v', 'cro');
            await valid('tcro1mz5rdtf9wufwkh8te2zww7twtmna6rhl2qlhlc', 'cro', 'testnet');
            await valid('tcro1mz5rdtf9wufwkh8te2zww7twtmna6rhl2qlhlc', 'cro', 'some-new');

            await invalid('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', 'cro');
            await invalid('cro1mwdzawjd27uku0cqf8zngxfcycd292u353xe77', 'cro');
            await invalid('tcro1mz5rdtf9wufwkh8te2zww7twtmna6rhl2qlhlc', 'cro');
            await invalid('cromwdzawjd27uku0cqf8zngxfcycd292u353xe7v1', 'cro');
        });

        it('should return true for correct solana addresses', async function () {
            await valid('833XorXTTx5iya5B3Tr6iqEs9GbRuvVfwyLCP2vpdzhq', 'solana');
            await valid('6ZRCB7AAqGre6c72PRz3MHLC73VMYvJ8bi9KHf1HFpNk', 'sol');
            await valid('HgyXhqapicB8zoyyFQ23oUwwFrBACDyDc7bqUuvnEELM', 'sol');
            await valid('833XorXTTx5iya5B3Tr6iqEs9GbRuvVfwyLCP2vpdzhq', 'sol', 'testnet');

            await valid('69UwBV4LPg7hHUS5JXiXyfgVnESmDKe8KJppsLj8pRU', 'sol');
            await valid('G4qGCGF4vWGPzYi2pxc2Djvgv3j8NiWaHQMgTVebCX6W', 'sol');
        });

    });

    describe('invalid results', function () {
        test('should throw error for unknown currency', async () => {
            await expect(isValid('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', '__unknown__'))
                .rejects
                .toThrow('Missing validator for currency: __unknown__');
        });

        async function commonTests(currency) {
            await invalid(undefined, currency); // wrong type: undefined
            await invalid(null, currency); // wrong type: null
            await invalid(true, currency); // wrong type: boolean
            await invalid(42, currency); // wrong type: number
            await invalid([42], currency); // wrong type: array
            await invalid({ foo: 'bar' }, currency); // wrong type: object
            await invalid('', currency); //reject blank
            await invalid('%%@', currency); //reject invalid base58 string
            await invalid('1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa', currency); //reject invalid address
            await invalid('bd839e4f6fadb293ba580df5dea7814399989983', currency);  //reject transaction id's
            //testnet
            await invalid('', currency, 'testnet'); //reject blank
            await invalid('%%@', currency, 'testnet'); //reject invalid base58 string
            await invalid('1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa', currency, 'testnet'); //reject invalid address
            await invalid('bd839e4f6fadb293ba580df5dea7814399989983', currency, 'testnet');  //reject transaction id's
        }

        it('should return false for incorrect bitcoin addresses', async function () {
            await commonTests('bitcoin');
        });

        it('should return false for incorrect bitcoincash addresses', async function () {
            await commonTests('bitcoincash');

            // bch addresses
            await invalid('bc1ql08eyrk03qytqc5pdp5fnwpfh0x3y3k2skauvd', 'bitcoincash', 'both');
        });

        it('should return false for incorrect litecoin addresses', async function () {
            await commonTests('litecoin');
        });

        it('should return false for incorrect peercoin addresses', async function () {
            await commonTests('peercoin');
        });

        it('should return false for incorrect dogecoin addresses', async function () {
            await commonTests('dogecoin');
        });

        it('should return false for incorrect beavercoin addresses', async function () {
            await commonTests('beavercoin');
        });

        it('should return false for incorrect freicoin addresses', async function () {
            await commonTests('freicoin');
        });

        it('should return false for incorrect protoshares addresses', async function () {
            await commonTests('protoshares');
        });

        it('should return false for incorrect megacoin addresses', async function () {
            await commonTests('megacoin');
        });

        it('should return false for incorrect primecoin addresses', async function () {
            await commonTests('primecoin');
        });

        it('should return false for incorrect auroracoin addresses', async function () {
            await commonTests('auroracoin');
        });

        it('should return false for incorrect namecoin addresses', async function () {
            await commonTests('namecoin');
        });

        it('should return false for incorrect biocoin addresses', async function () {
            await commonTests('biocoin');
        });

        it('should return false for incorrect garlicoin addresses', async function () {
            await commonTests('garlicoin');
        });

        it('should return false for incorrect vertcoin addresses', async function () {
            await commonTests('vertcoin');
        });

        it('should return false for incorrect bitcoingold addresses', async function () {
            await commonTests('bitcoingold');
        });

        it('should return false for incorrect decred addresses', async function () {
            await commonTests('decred');
        });

        it('should return false for incorrect erc20 addresses', async function () {

            await commonTests('game');
            await commonTests('usdc');

            // old game addresses
            await invalid('GU5BBtW9gxSKvAknvFi9yUaXKUNW9zUN2p', 'game');
            await invalid('GYxQMVzP6YpzX59QNRYqmJeHNtUMYSZPri', 'game');
        });

        it('should return false for incorrect monacoin addresses', async function () {
            await commonTests('mona');
        });

        it('should return false for incorrect solarcoin addresses', async function () {
            await commonTests('slr');
        });

        it('should return false for incorrect tether addresses', async function () {
            await commonTests('usdt');
            await invalid('1KdXaqcBeoMAFVAPwTmYvDbEq6RnvNPF6Jp', 'tether');
            await invalid('0xF6f6ebAf5D78F4c93Baf856d3005B7395CCC272eT', 'usdt');
            await invalid('3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL', 'usdt', { chainType: 'erc20' });
            await invalid('0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a', 'tether', { chainType: 'omni' });
        });

        it('should return false for incorrect expanse addresses', async function () {
            await commonTests('exp');
        });

        it('should return false for incorrect bankex addresses', async function () {
            await invalid('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez', 'bankex');
            await invalid('116CGDLddrZhMrTwhCVJXtXQpxygTT1kHd', 'BKX');
            await invalid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'bankex', 'testnet');
            await invalid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'BKX', 'testnet');
        });

        it('should return false for incorrect digibyte addresses', async function () {
            await commonTests('digibyte');
        });

        it('should return false for incorrect eip55 addresses', async function () {
            await invalid('6xAff4d6793F584a473348EbA058deb8caad77a288', 'ethereum');
            await invalid('0x02fcd51aAbB814FfFe17908fbc888A8975D839A5', 'ethereum');
            await invalid('0XD1220A0CF47C7B9BE7A2E6BA89F429762E7B9ADB', 'ethereum');
            await invalid('aFf4d6793f584a473348ebA058deb8caad77a2885', 'ethereum');
            await invalid('0xff4d6793F584a473', 'ethereum');

            await invalid('0x02fcd51aAbB814FfFe17908fbc888A8975D839A5', 'ethereumclassic');
            await invalid('0x02fcd51aAbB814FfFe17908fbc888A8975D839A5', 'etherzero');
            await invalid('0x02fcd51aAbB814FfFe17908fbc888A8975D839A5', 'callisto');
        });

        it('should return false for incorrect ripple addresses', async function () {
            await invalid('rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCN', 'ripple');
            await invalid('rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhMN', 'XRP');
            await invalid('6xAff4d6793F584a473348EbA058deb8ca', 'ripple');
            await invalid('DJ53hTyLBdZp2wMi5BsCS3rtEL1ioYUkva', 'ripple');
        });

        it('should return false for incorrect dash addresses', async function () {
            await commonTests('dash');
        });

        it('should return false for incorrect neo addresses', async function () {
            await commonTests('neo');
            await invalid('AR4QmqYENiZAD6oXe7ftm6eDcwtHk7rVTa', 'neo');
            await invalid('AKDVzYGLczmykdtRaejgvWeZrvdkVEvQ10', 'NEO');
        });

        it('should return false for incorrect qtum addresses', async function () {
            await commonTests('qtum');
            await invalid('QNPhBbVhDghASxcUh2vHotQUgNeLRFTcfb', 'qtum');
            await invalid('QOPhBbVhDghASxcUh2vHotQUgNeLRFTcfa', 'QTUM');
        });

        it('should return false for incorrect votecoin addresses', async function () {
            await commonTests('votecoin');
            await invalid('t1Y9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'votecoin');
            await invalid('t3Yz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'VOT');
            await invalid('t2YNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'votecoin', 'testnet');
        });

        it('should return false for incorrect bitcoinz addresses', async function () {
            await commonTests('bitcoinz');
            await invalid('t1Y9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'bitcoinz');
            await invalid('t3Yz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'BTCZ');
            await invalid('t2YNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'bitcoinz', 'testnet');
        });

        it('should return false for incorrect zclassic addresses', async function () {
            await commonTests('zclassic');
            await invalid('t1Y9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'zclassic');
            await invalid('t3Yz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'ZCL');
            await invalid('t2YNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'zclassic', 'testnet');
        });

        it('should return false for incorrect hush addresses', async function () {
            await invalid('t1Y9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'hush');
            await invalid('t3Yz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'HUSH');
            await invalid('t2YNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'hush', 'testnet');
        });

        it('should return false for incorrect zcash addresses', async function () {
            await commonTests('zcash');
            await invalid('t1Y9yhDa5XEjgfnTgZoKddeSiEN1aoLkQxq', 'zcash');
            await invalid('t3Yz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd', 'ZEC');
            await invalid('t2YNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'zcash', 'testnet');
        });

        it('should return false for incorrect bitcoinprivate addresses', async function () {
            await commonTests('bitcoinprivate');
            await invalid('b1Y4XXPFhwMb1SP33yhzn3h9qWXjujkgep4', 'bitcoinprivate');
            //invalid('bx....', 'BTCP');
            //invalid('nx....', 'bitcoinprivate', 'testnet');
        });

        it('should return false for incorrect snowgem addresses', async function () {
            await commonTests('snowgem');
            await invalid('s1Yx7WBkjB4UH6qQjPp6Ysmtr1C1JiTK2Yw', 'snowgem');
            await invalid('s3Y27MhkBRt3ha2UuxhjXaYF4DCnttTMnL1', 'SNG');
            await invalid('t2YNzUUx8mWBCRYPRezvA363EYXyEpHokyi', 'snowgem', 'testnet');
        });

        it('should return false for incorrect zencash addresses', async function () {
            await commonTests('zencash');
            await invalid('znYiGGfYRepxkBjXYvA2kFrXiC351i9ta4z', 'zencash');
            await invalid('zsYEdGnZCQ9G86LZFtbynMn1hYTVhn6eYCL', 'ZEN');
            await invalid('ztYWMDLWjbruCJxKmmfAZiT6QAQdiv5F291', 'zencash', 'testnet');
        });

        it('should return false for incorrect komodo addresses', async function () {
            await commonTests('komodo');
            await invalid('R9Y5HirAzqDcWrWGiJEL115dpV3QB3hobH', 'komodo');
            await invalid('RAYj2KKVUohTu3hVdNJ4U6hQi7TNawpacH', 'KMD');
        });

        it('should return false for incorrect cardano addresses', async function () {
            await commonTests('cardano');
            await invalid('Ae2tdPwUPEYxYNJw1He1esdZYvjmr4NtPzUsGTiqL9zd8ohjZYQcwu6lom7', 'cardano');
            await invalid('DdzFFzCqrhsfdzUZxvuBkhV8Lpm9p43p9ubh79GCTkxJikAjKh51qhtCFMqUniC5tv5ZExyvSmAte2Du2tGimavSo6qSgXbjiy8qZRTg1', 'cardano');
            await invalid('DdzFFzCqrhsfdzUZxvuBkhV8Lpm9p43p9ubh79GCTkxJikAjKh51qhtCFMqUniC5tv5ZExyvSmAte2Du2tGimavSo6qSgXbjiy8qZRT', 'ada');

            await invalid('adrr1qxy3w62dupy9pzmpdfzxz4k240w5vawyagl5m9djqquyymrtm3grn7gpnjh7rwh2dy62hk8639lt6kzn32yxq960usnq9pexvt', 'cardano');
            await invalid('addr2qxy3w62dupy9pzmpdfzxz4k240w5vawyagl5m9djqquyymrtm3grn7gpnjh7rwh2dy62hk8639lt6kzn32yxq960usnq9pexvt', 'cardano', 'prod');
            await invalid('addr1skemppmfevyk0lshu2w8j34707s3t3t58a04xcx5ccevrcmvpmxg2qt4pk0', 'cardano', 'testnet');

        });

        it('should return false for incorrect monero addresses', async function () {
            await commonTests('monero');
            await invalid('4AWygwA3hHNE4e4Yr9PtRWJiorXTjZkCi57g4ExYzfXDFFQ8DRFEFyui1dLqVknpqQjGUBdTMbgaFAZaDbrVHdk3GAKBZ3E', 'monero');
            await invalid('44643dtxcxjgMWEQLo6mh1c4d9Zxx9GbgK9hEj9iGSiFEryCkbwHyJ3JqxZJRqeC3Hb7ZBLKq5NkaJwR1x95EYnR1bTgN6d', 'xmr');
            await invalid('A17N9ztrxjQD3v3JJtHGvHVnq6BAbujDNEuensB6PFwBYFpkjAicih8hDtX76HBuEag5NeaCuMZmRMe6eE5NMRGxFTQn8nJ', 'monero', 'testnet');

            //integrated
            await invalid('4LNSCKNSTPNbJYkyAEgL966eHJHLDHiq1PpwKoiFBybcSqNGYfLBJApC62uQEeGAFxfYEd29uXBBrJFo7DhKqFVNi3GhmN79EtD5dgycYz', 'monero');
            await invalid('4JpzTwf3i1GeCV76beVr19179oa8j1L8xNSC1bXMtAxxdf4aTTLqubL8EvXfQmUGKt9MMigFtKy91VtoTTSfg1LU7LocPruT6KcGC9RKJV', 'xmr');
        });

        it('should return false for incorrect waves addresses', async function () {
            await commonTests('waves');
            await invalid('3P93mVrYnQ4ahaRMYwA2BeWY32eDxTpLVEs1', 'waves');
            await invalid('3P4eeU7v1LMHQFwwT2GW9W99c6vZyytHaj', 'waves');
            await invalid('2P93mVrYnQ4ahaRMYwA2BeWY32eDxTpLVEs', 'waves');

            await invalid('3Myrq5QDgRq3nBVRSSv9UYRP36xTtpJND5y', 'waves', 'testnet');
            await invalid('3My3KZgFQ3CrVHgz6vGRt8787sH4oAA1qp8', 'waves', 'testnet');
        });

        it('should return false for incorrect nano addresses', async function () {
            await commonTests('nano');
            await invalid('xrb_1f5e4w33ndqbkx4bw5jtp13kp5xghebfxcmw9hdt1f7goid1s4373w6tjdgu', 'nano');
            await invalid('nano_1f5e4w33ndqbkx4bw5jtp13kp5xghebfxcmw9hdt1f7goid1s4373w6tjdgu', 'nano');
            await invalid('xrb_1111111112111111111111111111111111111111111111111111hifc8npp', 'nano');
            await invalid('nano_111111111111111111111111111111111111111111111111111hifc8npp', 'nano');
        });

        it('should return false for incorrect siacoin addresses', async function () {
            await commonTests('siacoin')
            await invalid(
                'ffe1308c044ade30392a0cdc1fd5a4dbe94f9616a95faf888ed36123d9e711557aa497530372',
                'siacoin'
            )
        })

        it('should return false for incorrect lbry addresses', async function () {
            await commonTests('lbc')
            await invalid('ffe1308c044ade30392a0cdc1fd5a4dbe94f9616a95faf888ed36123d9e711557aa497530372', 'lbc')
        })

        it('should return false for incorrect tron addresses', async function () {
            await commonTests('trx');
            await invalid('xrb_1111111112111111111111111111111111111111111111111111hifc8npp', 'trx');
            await invalid('TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31', 'trx');
        });

        it('should return false for incorrect nem addresses', async function () {
            await commonTests('nem');
            await invalid('xrb_1111111112111111111111111111111111111111111111111111hifc8npp', 'nem');
            await invalid('TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31', 'nem');

            await invalid('3Myrq5QDgRq3nBVRSSv9UYRP36xTtpJND5y', 'nem', 'testnet');
            await invalid('3My3KZgFQ3CrVHgz6vGRt8787sH4oAA1qp8', 'nem', 'testnet');
        });
        //15823701926930889868L
        it('should return false for incorrect lsk addresses', async function () {
            await commonTests('lsk');
            await invalid('xrb_1111111112111111111111111111111111111111111111111111hifc8npp', 'lsk');
            await invalid('TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31', 'lsk');

            await invalid('158237019269308898689L', 'lsk');
            await invalid('158237A192B930C898689L', 'lsk');
        });

        it('should return false for incorrect bsv addresses', async function () {
            await commonTests('bsv');
            await invalid('xrb_1111111112111111111111111111111111111111111111111111hifc8npp', 'bsv');
            await invalid('TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31', 'bsv');

            await invalid('158237019269308898689L', 'bsv');
            await invalid('158237A192B930C898689L', 'bsv');
            await invalid('bitcoin:qzpuefrpg3kl2ykQe52rxn96pd3Kp4qudywr5pyrsf', 'bsv');
            await invalid('pzuefrpg3kl2ykqe52rxn96pd3kp4qudywr5py', 'bsv');
            await invalid('rlt2c2wuxr644encp3as0hygtj9djrsaumku3cex5', 'bsv');
            await invalid('qra607y4wnkmnpy3wcmrxmltzkrxywcq85c7watpdx09', 'bsv');
            await invalid('bitcoincash:qrwkk9a3es2wu7mdvzh0VEKFVJUZYSQ8TV7R3HCWR5', 'bsv');
        });

        it('should return false for incorrect stellar addresses', async function () {
            await commonTests('stellar');
            await invalid('SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU', 'stellar');
            await invalid('GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL', 'stellar');
            await invalid('GCFZB6L25D26RQFDWSSBDEYQ32JHLRMTT44ZYE3DZQUTYOL7WY43PLBG++', 'stellar');
            await invalid('GADE5QJ2TY7S5ZB65Q43DFGWYWCPHIYDJ2326KZGAGBN7AE5UY6JVDRRA', 'stellar');
            await invalid('GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2', 'stellar');
            await invalid('GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2T', 'stellar');
            await invalid('GDXIIZTKTLVYCBHURXL2UPMTYXOVNI7BRAEFQCP6EZCY4JLKY4VKFNLT', 'stellar');
            await invalid('SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY', 'stellar');
            await invalid('gWRYUerEKuz53tstxEuR3NCkiQDcV4wzFHmvLnZmj7PUqxW2wt', 'stellar');
            await invalid('g4VPBPrHZkfE8CsjuG2S4yBQNd455UWmk', 'stellar');
        });

        it('should return false for incorrect xtz(tezos) address', async function () {
            await commonTests('xtz');
            await invalid('SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU', 'xtz');
            await invalid('GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL', 'xtz');
            await invalid('GCFZB6L25D26RQFDWSSBDEYQ32JHLRMTT44ZYE3DZQUTYOL7WY43PLBG', 'xtz');
            await invalid('tz1RR6wy9BeXG3Fjk25YmkSMGHxTtKkhpX', 'xtz');
            await invalid('tz1h3rQ8wBxFd8L9B3d7JhaPQawu6Z568XU3xY', 'xtz');
            await invalid('tz1Lhf4J9Qxoe4DZ2nfe8FGDnvVj7oKjnMY6', 'xtz');
            await invalid('KT1E2LvxxFGB3Svh9p9HCP2jEEYyHjABMbK', 'xtz');

        });

        it('should return false for incorrect eos addresses', async function () {
            await commonTests('eos');
            await invalid('1234567890123', 'eos');
            await invalid('12345678901', 'eos');
            await invalid('12345678901@', 'eos');
        });

        it('should return false for incorrect solana addresses', async function () {
            await commonTests('sol');
            await invalid('833XQoXTx05iya53Tr6iqEs9GbRuvVfwyLCP2vpdzhq', 'solana');
            await invalid('833XorXTTx5iya5B3Tr6iqEs9GbRuvVfwyLCP2vpdz', 'solana');
            await invalid('bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej', 'sol');
            await invalid('Ae2tdPwUPEZKmwoy3AU3cXb5Chnasj6mvVNxV1H11997q3VW5ihbSfQwGpm', 'sol');
            await invalid('addr1skemppmfevyk0lshu2w8j34707s3t3t58a04xcx5ccevrcmvpmxg2qt4pk0', 'sol', 'testnet');
        });

        it('should return false for incorrect vet addresses', async function () {
            await commonTests('vet');
            await invalid('SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU', 'vet');
            await invalid('Ox46B8aABa5Eaa84Dc074c350eD57D8b3c35B90E09', 'vet');
            await invalid('0x46b8aABa5Eaa84Dc074c350eD57D8b3c35B90E09', 'vet');
        });

        it('should return false for incorrect algo addresses', async function () {
            await commonTests('algo');
            await invalid('GPNISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7Y', 'algo');
            await invalid('LCRDY3LYAANTVS3XRHEHWHGXRTKZYVTX55P5IA2AT5ZDJ4CWZFFZIKVHMJ', 'algo')
            await invalid('SP745JJR4KPRQEXJZHVIEN736LYTL2T2DFMG3OIIFJBV66K73PHNMDCZV', 'algo')
            await invalid('KHSHWO2TUWE53RMVG6ZUBNAEX6MTYPT76TCIDCDWYUUTK6HCJTZS2HDQU', 'algo')
        });

        it('should return false for incorrect dot addresses', async function () {
            await commonTests('dot');
            await invalid('1jQPKJmghHbrRhUiMt2cNEuxYbR6S9vYtJKqYvE4PNR9WDB', 'dot');
            await invalid('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fh', 'dot');
            await invalid('5CK8D1sKNwF473wbuBP6NuhQfPaWUetNsWUNAAzVwTfxqjf', 'dot');
            await invalid('pjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp', 'dot');
            await invalid('15FKUKXC6kwaXxJ1tNywmFy4ZY6FoDFCnU3fMbibFdeqwGw', 'dot');
            await invalid('CxDDSH8gS7jecsxaRL8Txf8H5kqesLXAEAEgp76Yz632J9M', 'dot');
        });
    });
});
