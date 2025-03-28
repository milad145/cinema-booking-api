import mongoose, {Schema} from 'mongoose';

const modelName = 'Room';
const schema = new Schema({
    name: {type: String, required: true, unique: true},
    seats: {type: Array, default: []}
}, {timestamps: true, collection: modelName})

export default mongoose.model(modelName, schema)
