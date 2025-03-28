import mongoose, {Schema} from 'mongoose';

const modelName = 'Screening';
const schema = new Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    }
}, {timestamps: true, collection: modelName});

// Prevent double bookings in same room at same time
schema.index({ room: 1, startTime: 1, endTime: 1 }, { unique: true });

export default mongoose.model(modelName, schema);
