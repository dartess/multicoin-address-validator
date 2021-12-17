<!--
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Do NOT manually edit README.md. Edit README_TEMPLATE.md and run 'npm run generate'. #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
-->

# @dartess/multicoin-address-validator

Simple wallet address validator for validating Bitcoin and other altcoins addresses in **Node.js and browser**.

Forked from [christsim/multicoin-address-validator](https://github.com/christsim/multicoin-address-validator) which was
forked from [ryanralph/altcoin-address](https://github.com/ryanralph/altcoin-address).

## Key differences of this fork

* The library is completely rewritten to the TypeScript.
* The library offers api for importing individual validators, which will have a positive effect on the bundle size in case of partial use.
* Other size optimizations and test improvements.

## Installation

### NPM

```
npm install @dartess/multicoin-address-validator
```

### Browser

```html
<script src="wallet-address-validator.min.js"></script>
```

## API

### main entry point: validate(address, currency[, options])

Returns true if the address (string) is a valid wallet address for the crypto currency specified, see below for supported currencies.

#### Parameters

* address - Wallet address to validate.
* currency - Currency name or symbol, e.g. `'bitcoin'`, `'litecoin'` or `'LTC'`
* options - Optional. Usually `networkType` (`string`) or `{ networkType: string }`.

###### option networkType

Use `'prod'` (default) to enforce standard address, `'testnet'` to enforce testnet address and `'both'` to enforce nothing.

###### extra options

* `xmr` (Monero) also support `stagenet` as `options.networkType`;
* `usdt` (Tether) also support 'erc20' | 'omni' as `options.chainType`;

### Example:

```
import { validate } from '@dartess/multicoin-address-validator';
// or const { validate } = require('@dartess/multicoin-address-validator');

const isValid = validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');
```

When connected via a script, it is available as a global variable `window.WAValidator`.

### separate entry points: validate(address[, options]);

The same, but due to the use of a separate validator, there is no need to send the currency.

In this case, options cannot be a string;

This connection can be useful if you only need to use some validators and want to save on the size of your bundle.

Not available when connecting through a script.

### Example:

```
import { adaValidate } from '@dartess/multicoin-address-validator/lib/currencies/ada';
// or const { adaValidate } = require('@dartess/multicoin-address-validator/lib/currencies/ada');

const isValid = adaValidate('Ae2tdPwUPEYzs5BRbGcoS3DXvK8mwgggmESz4HqUwMyaS9eNksZGz1LMS9v');
```

## Supported crypto currencies

%CURRENCIES%
