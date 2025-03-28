import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const modelName = 'User';
const schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true, collection: modelName})

schema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }

})
schema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (e) {
        throw e
    }
}

export default mongoose.model(modelName, schema)
