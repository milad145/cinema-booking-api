import mongoose, {Schema} from 'mongoose';

const modelName = 'Booking';
const schema = new Schema({
    screening: {
        type: Schema.Types.ObjectId,
        ref: 'Screening',
        required: true
    },
    seat: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, {timestamps: true, collection: modelName})

// Indexes for faster queries
schema.index({screening: 1, seat: 1, status: 1}, {unique: true});
schema.index({user: 1});
schema.index({status: 1});


export default mongoose.model(modelName, schema)
