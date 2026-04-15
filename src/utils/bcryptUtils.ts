import bcrypt from "bcrypt"

export const hash = async function(input : string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(input, salt)
}

export const compare = async function(plain : string, hash : string) :Promise<boolean>{
    return await bcrypt.compare(plain, hash)
}