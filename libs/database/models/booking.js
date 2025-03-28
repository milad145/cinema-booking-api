import mongoose, {Schema} from 'mongoose';

const modelName = 'Booking';
const schema = new Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    seat: { type: String, required: true },
    user: { type: String, required: true },
    status: { type: String, enum: ['booked', 'available'], default: 'booked' }
}, {timestamps: true, collection: modelName})

export default mongoose.model(modelName, schema)
