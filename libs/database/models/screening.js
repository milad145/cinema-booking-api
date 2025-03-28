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
    }
}, {timestamps: true, collection: modelName});

// Index for faster queries
schema.index({ movie: 1 });
schema.index({ room: 1 });
schema.index({ startTime: 1 });
schema.index({ endTime: 1 });

// Prevent overlapping screenings in same room
schema.index({ room: 1, startTime: 1, endTime: 1 }, { unique: true });

export default mongoose.model(modelName, schema);
