import mongoose, {Schema} from 'mongoose';

const modelName = 'Movie';
const schema = new Schema({
    name: {type: String, required: true},
    poster: {type: String},
    duration: {type: Number, required: true}, // in minutes
    description: {type: String}
}, {timestamps: true, collection: modelName})

export default mongoose.model(modelName, schema)
