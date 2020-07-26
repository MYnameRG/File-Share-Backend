const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorageSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    downloaded: {
        type: [Schema.Types.Mixed],
        required: false
    },
    uploaded: {
        type: [Schema.Types.Mixed],
        required: false
    }
});

const Storage = mongoose.model('storage', StorageSchema);
module.exports = Storage;