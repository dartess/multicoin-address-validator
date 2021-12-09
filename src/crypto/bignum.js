const { Buffer } = require('buffer');

/* bignumber.js v1.3.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

/*
  bignumber.js v1.3.0
  A JavaScript library for arbitrary-precision arithmetic.
  https://github.com/MikeMcl/bignumber.js
  Copyright (c) 2012 Michael Mclaughlin <M8ch88l@gmail.com>
  MIT Expat Licence
*/

/** ********************************* DEFAULTS *********************************** */

/*
 * The default values below must be integers within the stated ranges (inclusive).
 * Most of these values can be changed during run-time using BigNumber.config().
 */

/*
 * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP,
 * MAX_EXP, and the argument to toFixed, toPrecision and toExponential, beyond
 * which an exception is thrown (if ERRORS is true).
 */
const MAX = 1E9; // 0 to 1e+9

// The maximum number of decimal places for operations involving division.
let DECIMAL_PLACES = 20; // 0 to MAX

/*
     * The rounding mode used when rounding to the above decimal places, and when
     * using toFixed, toPrecision and toExponential, and round (default value).
     * UP         0 Away from zero.
     * DOWN       1 Towards zero.
     * CEIL       2 Towards +Infinity.
     * FLOOR      3 Towards -Infinity.
     * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
     * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
     * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
     * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
     * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
     */
let ROUNDING_MODE = 4; // 0 to 8

// EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

// The exponent value at and beneath which toString returns exponential notation.
// Number type: -7
let TO_EXP_NEG = -7; // 0 to -MAX

// The exponent value at and above which toString returns exponential notation.
// Number type: 21
let TO_EXP_POS = 21; // 0 to MAX

// RANGE : [MIN_EXP, MAX_EXP]

// The minimum exponent value, beneath which underflow to zero occurs.
// Number type: -324  (5e-324)
let MIN_EXP = -MAX; // -1 to -MAX

// The maximum exponent value, above which overflow to Infinity occurs.
// Number type:  308  (1.7976931348623157e+308)
let MAX_EXP = MAX; // 1 to MAX

// Whether BigNumber Errors are ever thrown.
// CHANGE parseInt to parseFloat if changing ERRORS to false.
let ERRORS = true; // true or false
let parse = parseInt; // parseInt or parseFloat

/** ******************************************************************************** */

const P = BigNumber.prototype;
const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_';
let outOfRange;
let id = 0;
const isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
const { trim } = String.prototype;
const ONE = BigNumber(1);

// CONSTRUCTOR

/*
 * The exported function.
 * Create and return a new instance of a BigNumber object.
 *
 * n {number|string|BigNumber} A numeric value.
 * [b] {number} The base of n. Integer, 2 to 64 inclusive.
 */
function BigNumber(n, b) {
    let e; let i; let isNum; let digits; let valid; let orig;
    const x = this;

    // Enable constructor usage without new.
    if (!(x instanceof BigNumber)) {
        return new BigNumber(n, b);
    }

    // Duplicate.
    if (n instanceof BigNumber) {
        id = 0;

        // e is undefined.
        if (b !== e) {
            n += '';
        } else {
            x.s = n.s;
            x.e = n.e;
            x.c = (n = n.c) ? n.slice() : n;
            return;
        }
    }

    // If number, check if minus zero.
    if (typeof n !== 'string') {
        n = (isNum = typeof n === 'number'
            || Object.prototype.toString.call(n) == '[object Number]')
        && n === 0 && 1 / n < 0 ? '-0' : `${n}`;
    }

    orig = n;

    if (b === e && isValid.test(n)) {
        // Determine sign.
        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

        // Either n is not a valid BigNumber or a base has been specified.
    } else {
        // Enable exponential notation to be used with base 10 argument.
        // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
        if (b == 10) {
            return setMode(n, DECIMAL_PLACES, ROUNDING_MODE);
        }

        n = trim.call(n).replace(/^\+(?!-)/, '');

        x.s = n.charAt(0) == '-' ? (n = n.replace(/^-(?!-)/, ''), -1) : 1;

        if (b != null) {
            if ((b == (b | 0) || !ERRORS)
                && !(outOfRange = !(b >= 2 && b < 65))) {
                digits = `[${DIGITS.slice(0, b |= 0)}]+`;

                // Before non-decimal number validity test and base conversion
                // remove the `.` from e.g. '1.', and replace e.g. '.1' with '0.1'.
                n = n.replace(/\.$/, '').replace(/^\./, '0.');

                // Any number in exponential form will fail due to the e+/-.
                if (valid = new RegExp(`^${digits}(?:\\.${digits})?$`, b < 37 ? 'i' : '').test(n)) {
                    if (isNum) {
                        if (n.replace(/^0\.0*|\./, '').length > 15) {
                            // 'new BigNumber() number type has more than 15 significant digits: {n}'
                            ifExceptionsThrow(orig, 0);
                        }

                        // Prevent later check for length on converted number.
                        isNum = !isNum;
                    }
                    n = convert(n, 10, b, x.s);
                } else if (n != 'Infinity' && n != 'NaN') {
                    // 'new BigNumber() not a base {b} number: {n}'
                    ifExceptionsThrow(orig, 1, b);
                    n = 'NaN';
                }
            } else {
                // 'new BigNumber() base not an integer: {b}'
                // 'new BigNumber() base out of range: {b}'
                ifExceptionsThrow(b, 2);

                // Ignore base.
                valid = isValid.test(n);
            }
        } else {
            valid = isValid.test(n);
        }

        if (!valid) {
            // Infinity/NaN
            x.c = x.e = null;

            // NaN
            if (n != 'Infinity') {
                // No exception on NaN.
                if (n != 'NaN') {
                    // 'new BigNumber() not a number: {n}'
                    ifExceptionsThrow(orig, 3);
                }
                x.s = null;
            }
            id = 0;

            return;
        }
    }

    // Decimal point?
    if ((e = n.indexOf('.')) > -1) {
        n = n.replace('.', '');
    }

    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {
        // Determine exponent.
        if (e < 0) {
            e = i;
        }
        e += +n.slice(i + 1);
        n = n.substring(0, i);
    } else if (e < 0) {
        // Integer.
        e = n.length;
    }

    // Determine leading zeros.
    for (i = 0; n.charAt(i) == '0'; i++) {
    }

    b = n.length;

    // Disallow numbers with over 15 significant digits if number type.
    if (isNum && b > 15 && n.slice(i).length > 15) {
        // 'new BigNumber() number type has more than 15 significant digits: {n}'
        ifExceptionsThrow(orig, 0);
    }
    id = 0;

    // Overflow?
    if ((e -= i + 1) > MAX_EXP) {
        // Infinity.
        x.c = x.e = null;

        // Zero or underflow?
    } else if (i == b || e < MIN_EXP) {
        // Zero.
        x.c = [x.e = 0];
    } else {
        // Determine trailing zeros.
        for (; n.charAt(--b) == '0';) {
        }

        x.e = e;
        x.c = [];

        // Convert string to array of digits (without leading and trailing zeros).
        for (e = 0; i <= b; x.c[e++] = +n.charAt(i++)) {
        }
    }
}

// CONSTRUCTOR PROPERTIES/METHODS

BigNumber.ROUND_UP = 0;
BigNumber.ROUND_DOWN = 1;
BigNumber.ROUND_CEIL = 2;
BigNumber.ROUND_FLOOR = 3;
BigNumber.ROUND_HALF_UP = 4;
BigNumber.ROUND_HALF_DOWN = 5;
BigNumber.ROUND_HALF_EVEN = 6;
BigNumber.ROUND_HALF_CEIL = 7;
BigNumber.ROUND_HALF_FLOOR = 8;

/*
 * Configure infrequently-changing library-wide settings.
 *
 * Accept an object or an argument list, with one or many of the following
 * properties or parameters respectively:
 * [ DECIMAL_PLACES [, ROUNDING_MODE [, EXPONENTIAL_AT [, RANGE [, ERRORS ]]]]]
 *
 * E.g.
 * BigNumber.config(20, 4) is equivalent to
 * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
 * Ignore properties/parameters set to null or undefined.
 *
 * Return an object with the properties current values.
 */
BigNumber.config = function () {
    let v; let p;
    let i = 0;
    const r = {};
    const a = arguments;
    const o = a[0];
    const c = 'config';
    const inRange = function (n, lo, hi) {
        return !((outOfRange = n < lo || n > hi)
                || parse(n) != n && n !== 0);
    };
    const has = o && typeof o === 'object'
        ? function () { if (o.hasOwnProperty(p)) return (v = o[p]) != null; }
        : function () { if (a.length > i) return (v = a[i++]) != null; };

    // [DECIMAL_PLACES] {number} Integer, 0 to MAX inclusive.
    if (has(p = 'DECIMAL_PLACES')) {
        if (inRange(v, 0, MAX)) {
            DECIMAL_PLACES = v | 0;
        } else {
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            ifExceptionsThrow(v, p, c);
        }
    }
    r[p] = DECIMAL_PLACES;

    // [ROUNDING_MODE] {number} Integer, 0 to 8 inclusive.
    if (has(p = 'ROUNDING_MODE')) {
        if (inRange(v, 0, 8)) {
            ROUNDING_MODE = v | 0;
        } else {
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            ifExceptionsThrow(v, p, c);
        }
    }
    r[p] = ROUNDING_MODE;

    /*
     * [EXPONENTIAL_AT] {number|number[]} Integer, -MAX to MAX inclusive or
     * [ integer -MAX to 0 inclusive, 0 to MAX inclusive ].
     */
    if (has(p = 'EXPONENTIAL_AT')) {
        if (inRange(v, -MAX, MAX)) {
            TO_EXP_NEG = -(TO_EXP_POS = ~~(v < 0 ? -v : +v));
        } else if (!outOfRange && v && inRange(v[0], -MAX, 0)
            && inRange(v[1], 0, MAX)) {
            TO_EXP_NEG = ~~v[0];
            TO_EXP_POS = ~~v[1];
        } else {
            // 'config() EXPONENTIAL_AT not an integer or not [integer, integer]: {v}'
            // 'config() EXPONENTIAL_AT out of range or not [negative, positive: {v}'
            ifExceptionsThrow(v, p, c, 1);
        }
    }
    r[p] = [TO_EXP_NEG, TO_EXP_POS];

    /*
     * [RANGE][ {number|number[]} Non-zero integer, -MAX to MAX inclusive or
     * [ integer -MAX to -1 inclusive, integer 1 to MAX inclusive ].
     */
    if (has(p = 'RANGE')) {
        if (inRange(v, -MAX, MAX) && ~~v) {
            MIN_EXP = -(MAX_EXP = ~~(v < 0 ? -v : +v));
        } else if (!outOfRange && v && inRange(v[0], -MAX, -1)
            && inRange(v[1], 1, MAX)) {
            MIN_EXP = ~~v[0], MAX_EXP = ~~v[1];
        } else {
            // 'config() RANGE not a non-zero integer or not [integer, integer]: {v}'
            // 'config() RANGE out of range or not [negative, positive: {v}'
            ifExceptionsThrow(v, p, c, 1, 1);
        }
    }
    r[p] = [MIN_EXP, MAX_EXP];

    // [ERRORS] {boolean|number} true, false, 1 or 0.
    if (has(p = 'ERRORS')) {
        if (v === !!v || v === 1 || v === 0) {
            parse = (outOfRange = id = 0, ERRORS = !!v)
                ? parseInt
                : parseFloat;
        } else {
            // 'config() ERRORS not a boolean or binary digit: {v}'
            ifExceptionsThrow(v, p, c, 0, 0, 1);
        }
    }
    r[p] = ERRORS;

    return r;
};

// PRIVATE FUNCTIONS

// Assemble error messages. Throw BigNumber Errors.
function ifExceptionsThrow(arg, i, j, isArray, isRange, isErrors) {
    if (ERRORS) {
        let error;
        const method = `${['new BigNumber', 'cmp', 'div', 'eq', 'gt', 'gte', 'lt',
            'lte', 'minus', 'mod', 'plus', 'times', 'toFr',
        ][id ? id < 0 ? -id : id : 1 / id < 0 ? 1 : 0]}()`;
        let message = outOfRange ? ' out of range' : ` not a${
            isRange ? ' non-zero' : 'n'} integer`;

        message = `${[
            `${method} number type has more than 15 significant digits`,
            `${method} not a base ${j} number`,
            `${method} base${message}`,
            `${method} not a number`][i]
            || `${j}() ${i}${isErrors
                ? ' not a boolean or binary digit'
                : message + (isArray
                    ? ` or not [${outOfRange
                        ? ' negative, positive'
                        : ' integer, integer'} ]`
                    : '')}`}: ${arg}`;

        outOfRange = id = 0;
        error = new Error(message);
        error.name = 'BigNumber Error';

        throw error;
    }
}

/*
 * Convert a numeric string of baseIn to a numeric string of baseOut.
 */
function convert(nStr, baseOut, baseIn, sign) {
    let e; let dvs; let dvd; let nArr; let fracArr; let
        fracBN;

    // Convert string of base bIn to an array of numbers of baseOut.
    // Eg. strToArr('255', 10) where baseOut is 16, returns [15, 15].
    // Eg. strToArr('ff', 16)  where baseOut is 10, returns [2, 5, 5].
    function strToArr(str, bIn) {
        let j;
        let i = 0;
        const strL = str.length;
        let arrL;
        const arr = [0];

        for (bIn = bIn || baseIn; i < strL; i++) {
            for (arrL = arr.length, j = 0; j < arrL; arr[j] *= bIn, j++) {
            }

            for (arr[0] += DIGITS.indexOf(str.charAt(i)), j = 0;
                j < arr.length;
                j++) {
                if (arr[j] > baseOut - 1) {
                    if (arr[j + 1] == null) {
                        arr[j + 1] = 0;
                    }
                    arr[j + 1] += arr[j] / baseOut ^ 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }

    // Convert array to string.
    // E.g. arrToStr( [9, 10, 11] ) becomes '9ab' (in bases above 11).
    function arrToStr(arr) {
        let i = 0;
        const arrL = arr.length;
        let str = '';

        for (; i < arrL; str += DIGITS.charAt(arr[i++])) {
        }

        return str;
    }

    if (baseIn < 37) {
        nStr = nStr.toLowerCase();
    }

    /*
     * If non-integer convert integer part and fraction part separately.
     * Convert the fraction part as if it is an integer than use division to
     * reduce it down again to a value less than one.
     */
    if ((e = nStr.indexOf('.')) > -1) {
        /*
         * Calculate the power to which to raise the base to get the number
         * to divide the fraction part by after it has been converted as an
         * integer to the required base.
         */
        e = nStr.length - e - 1;

        // Use toFixed to avoid possible exponential notation.
        dvs = strToArr(new BigNumber(baseIn).pow(e).toF(), 10);

        nArr = nStr.split('.');

        // Convert the base of the fraction part (as integer).
        dvd = strToArr(nArr[1]);

        // Convert the base of the integer part.
        nArr = strToArr(nArr[0]);

        // Result will be a BigNumber with a value less than 1.
        fracBN = divide(
            dvd,
            dvs,
            dvd.length - dvs.length,
            sign,
            baseOut,
            // Is least significant digit of integer part an odd number?
            nArr[nArr.length - 1] & 1,
        );

        fracArr = fracBN.c;

        // e can be <= 0  ( if e == 0, fracArr is [0] or [1] ).
        if (e = fracBN.e) {
            // Append zeros according to the exponent of the result.
            for (; ++e; fracArr.unshift(0)) {
            }

            // Append the fraction part to the converted integer part.
            nStr = `${arrToStr(nArr)}.${arrToStr(fracArr)}`;

            // fracArr is [1].
            // Fraction digits rounded up, so increment last digit of integer part.
        } else if (fracArr[0]) {
            if (nArr[e = nArr.length - 1] < baseOut - 1) {
                ++nArr[e];
                nStr = arrToStr(nArr);
            } else {
                nStr = new BigNumber(
                    arrToStr(nArr),
                    baseOut,
                ).plus(ONE).toS(baseOut);
            }

            // fracArr is [0]. No fraction digits.
        } else {
            nStr = arrToStr(nArr);
        }
    } else {
        // Simple integer. Convert base.
        nStr = arrToStr(strToArr(nStr));
    }

    return nStr;
}

// Perform division in the specified base. Called by div and convert.
function divide(dvd, dvs, exp, s, base, isOdd) {
    let dvsL; let dvsT; let next; let cmp; let remI;
    const dvsZ = dvs.slice();
    let dvdI = dvsL = dvs.length;
    const dvdL = dvd.length;
    let rem = dvd.slice(0, dvsL);
    let remL = rem.length;
    const quo = new BigNumber(ONE);
    const qc = quo.c = [];
    let qi = 0;
    const dig = DECIMAL_PLACES + (quo.e = exp) + 1;

    quo.s = s;
    s = dig < 0 ? 0 : dig;

    // Add zeros to make remainder as long as divisor.
    for (; remL++ < dvsL; rem.push(0)) {
    }

    // Create version of divisor with leading zero.
    dvsZ.unshift(0);

    do {
        // 'next' is how many times the divisor goes into the current remainder.
        for (next = 0; next < base; next++) {
            // Compare divisor and remainder.
            if (dvsL != (remL = rem.length)) {
                cmp = dvsL > remL ? 1 : -1;
            } else {
                for (remI = -1, cmp = 0; ++remI < dvsL;) {
                    if (dvs[remI] != rem[remI]) {
                        cmp = dvs[remI] > rem[remI] ? 1 : -1;
                        break;
                    }
                }
            }

            // Subtract divisor from remainder (if divisor < remainder).
            if (cmp < 0) {
                // Remainder cannot be more than one digit longer than divisor.
                // Equalise lengths using divisor with extra leading zero?
                for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {
                    if (rem[--remL] < dvsT[remL]) {
                        for (remI = remL;
                            remI && !rem[--remI];
                            rem[remI] = base - 1) {
                        }
                        --rem[remI];
                        rem[remL] += base;
                    }
                    rem[remL] -= dvsT[remL];
                }
                for (; !rem[0]; rem.shift()) {
                }
            } else {
                break;
            }
        }

        // Add the 'next' digit to the result array.
        qc[qi++] = cmp ? next : ++next;

        // Update the remainder.
        rem[0] && cmp
            ? (rem[remL] = dvd[dvdI] || 0)
            : (rem = [dvd[dvdI]]);
    } while ((dvdI++ < dvdL || rem[0] != null) && s--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {
        // There can't be more than one zero.
        --quo.e;
        qc.shift();
    }

    // Round?
    if (qi > dig) {
        rnd(quo, DECIMAL_PLACES, base, isOdd, rem[0] != null);
    }

    // Overflow?
    if (quo.e > MAX_EXP) {
        // Infinity.
        quo.c = quo.e = null;

        // Underflow?
    } else if (quo.e < MIN_EXP) {
        // Zero.
        quo.c = [quo.e = 0];
    }

    return quo;
}

/*
 * Return a string representing the value of BigNumber n in normal or
 * exponential notation rounded to the specified decimal places or
 * significant digits.
 * Called by toString, toExponential (exp 1), toFixed, and toPrecision (exp 2).
 * d is the index (with the value in normal notation) of the digit that may be
 * rounded up.
 */
function format(n, d, exp) {
    // Initially, i is the number of decimal places required.
    let i = d - (n = new BigNumber(n)).e;
    const { c } = n;

    // +-Infinity or NaN?
    if (!c) {
        return n.toS();
    }

    // Round?
    if (c.length > ++d) {
        rnd(n, i, 10);
    }

    // Recalculate d if toFixed as n['e'] may have changed if value rounded up.
    i = c[0] == 0 ? i + 1 : exp ? d : n.e + i + 1;

    // Append zeros?
    for (; c.length < i; c.push(0)) {
    }
    i = n.e;

    /*
     * toPrecision returns exponential notation if the number of significant
     * digits specified is less than the number of digits necessary to
     * represent the integer part of the value in normal notation.
     */
    return exp == 1 || exp == 2 && (--d < i || i <= TO_EXP_NEG)

        // Exponential notation.
        ? (n.s < 0 && c[0] ? '-' : '') + (c.length > 1
            ? (c.splice(1, 0, '.'), c.join(''))
            : c[0]) + (i < 0 ? 'e' : 'e+') + i

        // Normal notation.
        : n.toS();
}

// Round if necessary.
// Called by divide, format, setMode and sqrt.
function rnd(x, dp, base, isOdd, r) {
    const xc = x.c;
    const isNeg = x.s < 0;
    const half = base / 2;
    let i = x.e + dp + 1;

    // 'next' is the digit after the digit that may be rounded up.
    const next = xc[i];

    /*
         * 'more' is whether there are digits after 'next'.
         * E.g.
         * 0.005 (e = -3) to be rounded to 0 decimal places (dp = 0) gives i = -2
         * The 'next' digit is zero, and there ARE 'more' digits after it.
         * 0.5 (e = -1) dp = 0 gives i = 0
         * The 'next' digit is 5 and there are no 'more' digits after it.
         */
    const more = r || i < 0 || xc[i + 1] != null;

    r = ROUNDING_MODE < 4
        ? (next != null || more)
        && (ROUNDING_MODE == 0
            || ROUNDING_MODE == 2 && !isNeg
            || ROUNDING_MODE == 3 && isNeg)
        : next > half || next == half
        && (ROUNDING_MODE == 4 || more

            /*
             * isOdd is used in base conversion and refers to the least significant
             * digit of the integer part of the value to be converted. The fraction
             * part is rounded by this method separately from the integer part.
             */
            || ROUNDING_MODE == 6 && (xc[i - 1] & 1 || !dp && isOdd)
            || ROUNDING_MODE == 7 && !isNeg
            || ROUNDING_MODE == 8 && isNeg);

    if (i < 1 || !xc[0]) {
        xc.length = 0;
        xc.push(0);

        if (r) {
            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            xc[0] = 1;
            x.e = -dp;
        } else {
            // Zero.
            x.e = 0;
        }

        return x;
    }

    // Remove any digits after the required decimal places.
    xc.length = i--;

    // Round up?
    if (r) {
        // Rounding up may mean the previous digit has to be rounded up and so on.
        for (--base; ++xc[i] > base;) {
            xc[i] = 0;

            if (!i--) {
                ++x.e;
                xc.unshift(1);
            }
        }
    }

    // Remove trailing zeros.
    for (i = xc.length; !xc[--i]; xc.pop()) {
    }

    return x;
}

// Round after setting the appropriate rounding mode.
// Handles ceil, floor and round.
function setMode(x, dp, rm) {
    const r = ROUNDING_MODE;

    ROUNDING_MODE = rm;
    x = new BigNumber(x);
    x.c && rnd(x, dp, 10);
    ROUNDING_MODE = r;

    return x;
}

// PROTOTYPE/INSTANCE METHODS

/*
 * Return a new BigNumber whose value is the absolute value of this BigNumber.
 */
P.abs = function () {
    const x = new BigNumber(this);

    if (x.s < 0) {
        x.s = 1;
    }

    return x;
};

/*
 * Return
 * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
 * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
 * 0 if they have the same value,
 * or null if the value of either is NaN.
 */
P.cmp = function (y, b) {
    let a;
    const x = this;
    const xc = x.c;
    const yc = (id = -id, y = new BigNumber(y, b)).c;
    let i = x.s;
    let j = y.s;
    let k = x.e;
    let l = y.e;

    // Either NaN?
    if (!i || !j) {
        return null;
    }

    a = xc && !xc[0], b = yc && !yc[0];

    // Either zero?
    if (a || b) {
        return a ? b ? 0 : -j : i;
    }

    // Signs differ?
    if (i != j) {
        return i;
    }

    // Either Infinity?
    if (a = i < 0, b = k == l, !xc || !yc) {
        return b ? 0 : !xc ^ a ? 1 : -1;
    }

    // Compare exponents.
    if (!b) {
        return k > l ^ a ? 1 : -1;
    }

    // Compare digit by digit.
    for (i = -1,
    j = (k = xc.length) < (l = yc.length) ? k : l;
        ++i < j;) {
        if (xc[i] != yc[i]) {
            return xc[i] > yc[i] ^ a ? 1 : -1;
        }
    }
    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
};

/*
 * Return true if the value of this BigNumber is less than the value of
 * BigNumber(n, b), otherwise returns false.
 */
P.lt = function (n, b) {
    id = 6;
    return this.cmp(n, b) < 0;
};

// !!! abs, lt, cmp, toString

/*
 * Return a buffer containing the
 */
P.toBuffer = function (opts) {
    if (typeof opts === 'string') {
        if (opts !== 'mpint') return 'Unsupported Buffer representation';

        const abs = this.abs();
        var buf = abs.toBuffer({ size: 1, endian: 'big' });
        var len = buf.length === 1 && buf[0] === 0 ? 0 : buf.length;
        if (buf[0] & 0x80) len++;

        const ret = Buffer.alloc(4 + len);
        if (len > 0) buf.copy(ret, 4 + (buf[0] & 0x80 ? 1 : 0));
        if (buf[0] & 0x80) ret[4] = 0;

        ret[0] = len & (0xff << 24);
        ret[1] = len & (0xff << 16);
        ret[2] = len & (0xff << 8);
        ret[3] = len & (0xff << 0);

        // two's compliment for negative integers:
        const isNeg = this.lt(0);
        if (isNeg) {
            for (let i = 4; i < ret.length; i++) {
                ret[i] = 0xff - ret[i];
            }
        }
        ret[4] = (ret[4] & 0x7f) | (isNeg ? 0x80 : 0);
        if (isNeg) ret[ret.length - 1]++;

        return ret;
    }

    if (!opts) opts = {};

    const endian = { 1: 'big', '-1': 'little' }[opts.endian]
        || opts.endian || 'big';
    let hex = this.toString(16);
    if (hex.charAt(0) === '-') {
        throw new Error(
            'converting negative numbers to Buffers not supported yet',
        );
    }

    const size = opts.size === 'auto' ? Math.ceil(hex.length / 2) : (opts.size || 1);

    var len = Math.ceil(hex.length / (2 * size)) * size;
    var buf = Buffer.alloc(len);

    // zero-pad the hex string so the chunks are all `size` long
    while (hex.length < 2 * len) hex = `0${hex}`;

    const hx = hex
        .split(new RegExp(`(.{${2 * size}})`))
        .filter((s) => s.length > 0);
    hx.forEach((chunk, i) => {
        for (let j = 0; j < size; j++) {
            const ix = i * size + (endian === 'big' ? j : size - j - 1);
            buf[ix] = parseInt(chunk.slice(j * 2, j * 2 + 2), 16);
        }
    });

    return buf;
};

/*
 * Return a string representing the value of this BigNumber in base b, or
 * base 10 if b is omitted. If a base is specified, including base 10,
 * round according to DECIMAL_PLACES and ROUNDING_MODE.
 * If a base is not specified, and this BigNumber has a positive exponent
 * that is equal to or greater than TO_EXP_POS, or a negative exponent equal
 * to or less than TO_EXP_NEG, return exponential notation.
 *
 * [b] {number} Integer, 2 to 64 inclusive.
 */
P.toString = function (b) {
    let u; let str; let strL;
    const x = this;
    let xe = x.e;

    // Infinity or NaN?
    if (xe === null) {
        str = x.s ? 'Infinity' : 'NaN';

        // Exponential format?
    } else if (b === u && (xe <= TO_EXP_NEG || xe >= TO_EXP_POS)) {
        return format(x, x.c.length - 1, 1);
    } else {
        str = x.c.join('');

        // Negative exponent?
        if (xe < 0) {
            // Prepend zeros.
            for (; ++xe; str = `0${str}`) {
            }
            str = `0.${str}`;

            // Positive exponent?
        } else if (strL = str.length, xe > 0) {
            if (++xe > strL) {
                // Append zeros.
                for (xe -= strL; xe--; str += '0') {
                }
            } else if (xe < strL) {
                str = `${str.slice(0, xe)}.${str.slice(xe)}`;
            }

            // Exponent zero.
        } else if (u = str.charAt(0), strL > 1) {
            str = `${u}.${str.slice(1)}`;

            // Avoid '-0'
        } else if (u == '0') {
            return u;
        }

        if (b != null) {
            if (!(outOfRange = !(b >= 2 && b < 65))
                && (b == (b | 0) || !ERRORS)) {
                str = convert(str, b | 0, 10, x.s);

                // Avoid '-0'
                if (str == '0') {
                    return str;
                }
            } else {
                // 'toS() base not an integer: {b}'
                // 'toS() base out of range: {b}'
                ifExceptionsThrow(b, 'base', 'toS');
            }
        }
    }

    return x.s < 0 ? `-${str}` : str;
};

// EXPORT
module.exports = BigNumber;
