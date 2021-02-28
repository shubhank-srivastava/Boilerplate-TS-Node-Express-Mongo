import mongoose from 'mongoose';
import Password from '../services/password';

interface UserAttrs {
    email: string;
    password: string;
}

interface UserHiddenAttrs {
    salt: string;
}

interface UserDoc extends mongoose.Document, UserAttrs, UserHiddenAttrs {}

interface UserModel extends mongoose.Model<UserDoc> { 
    build: (attrs: UserAttrs) => UserDoc;
}

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        salt: {
            type: String
        }
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret.password;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

UserSchema.pre('save', function(done) {
    if (this.isModified('password')) {
        const { salt, pass } = Password.generate(this.get('password'));
        this.set('password', pass);
        this.set('salt', salt);
    }
    done();
});

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;

export { UserAttrs }