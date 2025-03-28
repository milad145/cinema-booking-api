import mongoose, {Schema} from 'mongoose';

const modelName = 'Room';
const schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        rows: {
            type: Number,
            required: true,
            min: 1,
            max: 26 // A-Z
        },
        seatsPerRow: {
            type: Number,
            required: true,
            min: 1,
            max: 50
        },
        seats: {
            type: [String], // Array of seat numbers like "A1", "A2", etc.
            default: []
        }
    },
    {
        timestamps: true, collection:
        modelName
    }
)

schema.methods.generateSeats = function () {
    const seats = [];
    for (let row = 1; row <= this.rows; row++) {
        for (let seat = 1; seat <= this.seatsPerRow; seat++) {
            seats.push(`${String.fromCharCode(64 + row)}${seat}`);
        }
    }
    return seats;
};

schema.pre('save', function (next) {
    if (this.isNew) {
        this.seats = this.generateSeats();
    }
    next();
});

export default mongoose.model(modelName, schema)
