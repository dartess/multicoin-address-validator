# WIP: PLEASE DON'T USE

<!--
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Do NOT manually edit README.md. Edit README_TEMPLATE.md and run 'npm run generate'. #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
-->

# wallet-address-validator

Simple wallet address validator for validating Bitcoin and other altcoins addresses in **Node.js and browser**.

[![Build Status](https://travis-ci.org/christsim/multicoin-address-validator.svg?branch=master)](https://travis-ci.org/christsim/multicoin-address-validator)

Forked from [ryanralph/altcoin-address](https://github.com/ryanralph/altcoin-address).

**File size is ~17 kB (minifed and gzipped)**.

## Installation

### NPM
```
npm install multicoin-address-validator
```

### Browser
```html
<script src="wallet-address-validator.min.js"></script>
```

## API

##### validate (address [, currency = 'bitcoin'[, networkType = 'prod']])

###### Parameters
* address - Wallet address to validate.
* currency - Optional. Currency name or symbol, e.g. `'bitcoin'` (default), `'litecoin'` or `'LTC'`
* networkType - Optional. Use `'prod'` (default) to enforce standard address, `'testnet'` to enforce testnet address and `'both'` to enforce nothing.

> Returns true if the address (string) is a valid wallet address for the crypto currency specified, see below for supported currencies.

### Supported crypto currencies

%CURRENCIES%

### Usage example

#### Node
```javascript
var WAValidator = require('multicoin-address-validator');

var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');
if(valid)
	console.log('This is a valid address');
else
	console.log('Address INVALID');

// This will log 'This is a valid address' to the console.
```

```javascript
var WAValidator = require('multicoin-address-validator');

var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'litecoin', 'testnet');
if(valid)
      console.log('This is a valid address');
else
      console.log('Address INVALID');

// As this is a invalid litecoin address 'Address INVALID' will be logged to console.
```

```javascript
var WAValidator = require('multicoin-address-validator');

var currency = WAValidator.findCurrency('xrp');
if(currency)
      console.log('This currency exists');
else
      console.log('Currency INVALID');

// As this is a valid currency symbol 'This currency exists' will be logged to console.
```

```javascript
var WAValidator = require('multicoin-address-validator');

var currency = WAValidator.findCurrency('random');
if(currency)
      console.log('This currency exists');
else
      console.log('Currency INVALID');

// As this is not a valid currency symbol 'Currency INVALID' will be logged to console.
```
#### Browser
```html
<script src="wallet-address-validator.min.js"></script>
```

```javascript
// WAValidator is exposed as a global (window.WAValidator)
var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'bitcoin');
if(valid)
    alert('This is a valid address');
else
    alert('Address INVALID');

// This should show a pop up with text 'This is a valid address'.
```
