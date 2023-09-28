import bcrypt from 'bcrypt';

export class HashService {
    encrypt(value) {
        return bcrypt.hashSync(value, bcrypt.genSaltSync(12))
    }
    
    verify(value, encryptedValue) {
        return bcrypt.compareSync(value, encryptedValue)
    }
}

