import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const encript = async (text: string) => {
    const hash = await bcrypt.hash(text, SALT_ROUNDS);

    return hash;
}

export const compare = async (text: string, hash: string) => {
    const isMatch = await bcrypt.compare(text, hash);

    return isMatch;
}
