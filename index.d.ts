declare module "multicoin-address-validator/currencies/bch" {
    export const bch: any;
    export const bchValidate: (address: string, opts?: any) => boolean;
}

declare module "multicoin-address-validator/currencies/trx" {
    export const trx: any;
    export const trxValidate: (address: string, opts?: any) => boolean;
}
