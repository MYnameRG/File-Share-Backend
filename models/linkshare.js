const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkShareSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    store: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const LinkShare = mongoose.model('linkshare', LinkShareSchema);
module.exports = LinkShare;