const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const GeoSchema = new Schema({
    type: {
    type: String,
    default: "point"
    }, 
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});
const driverSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name field is required']
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default:false
    },
    geometry: GeoSchema
});

const Driver = mongoose.model('driver' , driverSchema);
module.exports = Driver;