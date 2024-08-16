const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        french: {
            type: String,
            required: 'French word cannot be blank'
        },
        vietnam: {
            type: String,
            required: 'Vietnam word cannot be blank'
        }
    },
    {collection: 'vocab',
    timestamps: true}
);

VocabSchema.index({ english: 1 }, { unique: true });
VocabSchema.index({ german: 1 }, { unique: true });
VocabSchema.index({ french: 1 }, { unique: true });
VocabSchema.index({ vietnam: 1 }, { unique: true });

module.exports = mongoose.model('Vocab', VocabSchema);