export type Address = string;

export type OptsNetworkTypeOptional<T extends string = string> = {
    networkType?: T;
};

export type ExtractNetworkType<U> = U extends { addressTypes: unknown } ? keyof U['addressTypes'] : never;
