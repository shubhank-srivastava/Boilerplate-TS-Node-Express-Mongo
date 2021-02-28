import { pbkdf2Sync, randomBytes } from 'crypto';

class Password {
    static generate(password: string): {salt: string, pass: string} {
        const salt = randomBytes(8).toString('hex');
        const pass = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
        return {salt, pass};
    }

    static match(pass: string, salt: string, input: string): boolean {
        const hash = pbkdf2Sync(input, salt, 100000, 64, 'sha512').toString('hex');
        return hash === pass;
    } 
}

export default Password;