const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicId: String,
    subscribers: [String]
});

module.exports = mongoose.model('Topic', topicSchema);
