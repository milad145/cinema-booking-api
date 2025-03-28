import mongoose, {Schema} from 'mongoose';

const modelName = 'Movie';
const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    poster: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true,
        min: 1,
        max: 300
    },
    description: {
        type: String,
        maxlength: 1000
    }
}, {timestamps: true, collection: modelName})

schema.index({name: 1});

export default mongoose.model(modelName, schema)
