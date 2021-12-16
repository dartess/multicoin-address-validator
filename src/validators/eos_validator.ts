const EOSValidator = {
    isValidAddress(address: string) {
        return /^[a-z0-9.]{12}$/.test(address);
    },
};

type Validator = Parameters<typeof EOSValidator.isValidAddress>;

export { EOSValidator };
export type { Validator };
