import { Address } from '../types';

const EOSValidator = {
    isValidAddress(address: Address) {
        if (typeof address !== 'string') {
            return false;
        }
        return /^[a-z0-9.]{12}$/.test(address);
    },
};

type Validator = Parameters<typeof EOSValidator.isValidAddress>;

export { EOSValidator };
export type { Validator };
