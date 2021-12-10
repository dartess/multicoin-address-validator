export type Address = string;

export type OptsNetworkTypeOptional<T extends string = string> = {
    networkType?: T;
};
