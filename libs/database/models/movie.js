import mongoose, {Schema} from 'mongoose';

const modelName = 'Movie';
const schema = new Schema({
    name: {type: String, required: true},
    poster: {type: String},
    schedule: {type: Date, required: true},
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true}
}, {timestamps: true, collection: modelName})

export default mongoose.model(modelName, schema)
